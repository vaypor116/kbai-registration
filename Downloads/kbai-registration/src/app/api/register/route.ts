import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { ApiResponse } from '@/lib/types'

function generateRegId(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `KBAI-${ts}${rand}`
}

function getAge(dob: string): number {
  const today = new Date()
  const birth = new Date(dob)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

export async function POST(req: NextRequest) {
  try {
    // Supabase client created here at runtime, not at build time
    const supabase = getSupabaseAdmin()

    const formData = await req.formData()

    // ── Extract fields ──
    const firstName = formData.get('first_name') as string
    const lastName = formData.get('last_name') as string
    const dateOfBirth = formData.get('date_of_birth') as string
    const gender = formData.get('gender') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const state = formData.get('state') as string
    const lga = formData.get('lga') as string
    const guardianName = formData.get('guardian_name') as string
    const guardianPhone = formData.get('guardian_phone') as string
    const guardianEmail = formData.get('guardian_email') as string
    const guardianRelationship = formData.get('guardian_relationship') as string
    const schoolName = formData.get('school_name') as string
    const gradeClass = formData.get('grade_class') as string
    const priorCodingExperience = formData.get('prior_coding_experience') as string
    const howHeard = formData.get('how_heard') as string
    const photoFile = formData.get('photo') as File | null

    // ── Server-side validation ──
    if (!firstName || !lastName || !dateOfBirth || !state || !guardianName || !guardianPhone) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const age = getAge(dateOfBirth)
    if (age < 7 || age > 17) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Student must be between 7 and 17 years old' },
        { status: 400 }
      )
    }

    const regId = generateRegId()

    // ── Upload photo if provided ──
    let photoUrl: string | null = null
    if (photoFile && photoFile.size > 0) {
      if (photoFile.size > 5 * 1024 * 1024) {
        return NextResponse.json<ApiResponse>(
          { success: false, error: 'Photo must be under 5MB' },
          { status: 400 }
        )
      }

      const ext = photoFile.type === 'image/png' ? 'png' : 'jpg'
      const path = `${regId}.${ext}`
      const arrayBuffer = await photoFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error: uploadError } = await supabase.storage
        .from('student-photos')
        .upload(path, buffer, {
          contentType: photoFile.type,
          upsert: true,
        })

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from('student-photos')
          .getPublicUrl(path)
        photoUrl = urlData.publicUrl
      } else {
        console.error('Photo upload error:', uploadError)
        // Don't fail the whole registration if photo upload fails
      }
    }

    // ── Insert student into database ──
    const { error: insertError } = await supabase
      .from('students')
      .insert({
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        age,
        gender: gender || null,
        email: email || null,
        phone: phone || null,
        state,
        lga: lga || null,
        guardian_name: guardianName,
        guardian_phone: guardianPhone,
        guardian_email: guardianEmail || null,
        guardian_relationship: guardianRelationship || null,
        school_name: schoolName || null,
        grade_class: gradeClass || null,
        prior_coding_experience: priorCodingExperience || null,
        how_heard: howHeard || null,
        photo_url: photoUrl,
        registration_id: regId,
        program_version: '2.0',
        status: 'pending',
      })

    if (insertError) {
      console.error('DB insert error:', insertError)
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Failed to save registration. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      registration_id: regId,
    })

  } catch (err) {
    console.error('Unexpected error:', err)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
