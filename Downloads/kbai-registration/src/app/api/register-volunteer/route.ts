import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { ApiResponse } from '@/lib/types'

function generateRegId(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `KBAI-VOL-${ts}${rand}`
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const body = await req.json()

    const {
      first_name,
      last_name,
      email,
      phone,
      state,
      occupation,
      role_type,
      areas_of_expertise,
      other_expertise,
      availability,
      days_available,
      has_volunteered_before,
      motivation,
      how_heard,
    } = body

    // ── Server-side validation ──
    if (!first_name || !last_name || !phone || !state) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!Array.isArray(role_type) || role_type.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Please select at least one role' },
        { status: 400 }
      )
    }

    if (!Array.isArray(areas_of_expertise) || areas_of_expertise.length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Please select at least one area of expertise' },
        { status: 400 }
      )
    }

    if (!availability) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Please select your availability' },
        { status: 400 }
      )
    }

    const regId = generateRegId()

    const { error: insertError } = await supabase
      .from('volunteers')
      .insert({
        first_name,
        last_name,
        email: email || null,
        phone,
        state,
        occupation: occupation || null,
        role_type, // text[] column
        areas_of_expertise, // text[] column
        other_expertise: other_expertise || null,
        availability,
        days_available: Array.isArray(days_available) ? days_available : [],
        has_volunteered_before: has_volunteered_before || null,
        motivation: motivation || null,
        how_heard: how_heard || null,
        registration_id: regId,
        program_version: '2.0',
        status: 'pending',
      })

    if (insertError) {
      console.error('DB insert error (volunteers):', insertError)
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Failed to save application. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      registration_id: regId,
    })

  } catch (err) {
    console.error('Unexpected error (volunteers):', err)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
