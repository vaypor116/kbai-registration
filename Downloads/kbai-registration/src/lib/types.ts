export interface StudentRegistration {
  // Personal
  first_name: string
  last_name: string
  date_of_birth: string
  age: number
  gender?: string
  email?: string
  phone?: string

  // Location
  state: string
  lga?: string

  // Guardian
  guardian_name: string
  guardian_phone: string
  guardian_email?: string
  guardian_relationship?: string

  // Academic
  school_name?: string
  grade_class?: string
  prior_coding_experience?: string
  how_heard?: string

  // System
  photo_url?: string
  registration_id: string
  program_version: string
  status: string
}

export interface ApiResponse {
  success: boolean
  registration_id?: string
  error?: string
}
