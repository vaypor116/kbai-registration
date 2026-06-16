'use client'

import { useState, useRef, useCallback } from 'react'
import styles from './RegistrationForm.module.css'

type Step = 1 | 2 | 3 | 4

interface FormData {
  first_name: string; last_name: string; date_of_birth: string; gender: string
  email: string; phone: string; state: string; lga: string
  guardian_name: string; guardian_phone: string; guardian_email: string; guardian_relationship: string
  school_name: string; grade_class: string; prior_coding_experience: string; how_heard: string
}

const INITIAL: FormData = {
  first_name: '', last_name: '', date_of_birth: '', gender: '',
  email: '', phone: '', state: '', lga: '',
  guardian_name: '', guardian_phone: '', guardian_email: '', guardian_relationship: '',
  school_name: '', grade_class: '', prior_coding_experience: '', how_heard: '',
}

const STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT — Abuja','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
  'Taraba','Yobe','Zamfara',
]

function getAge(dob: string) {
  const today = new Date(), birth = new Date(dob)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const STEPS = ['Student', 'Guardian', 'Academic', 'Photo']

export default function RegistrationForm() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [cameraOpen, setCameraOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [successId, setSuccessId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null)
  const [ageError, setAgeError] = useState('')

  const fileRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((msg: string, error = false) => {
    setToast({ msg, error })
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }, [])

  const set = (k: keyof FormData, v: string) => setForm(p => ({ ...p, [k]: v }))

  const validate = (s: Step) => {
    if (s === 1) {
      if (!form.first_name || !form.last_name || !form.date_of_birth || !form.state) {
        showToast('Please fill in all required fields', true); return false
      }
      const age = getAge(form.date_of_birth)
      if (age < 7 || age > 17) {
        showToast('Student must be between 7 and 17 years old', true); return false
      }
    }
    if (s === 2 && (!form.guardian_name || !form.guardian_phone)) {
      showToast('Please fill in all required fields', true); return false
    }
    return true
  }

  const goTo = (n: Step) => {
    if (n > step && !validate(step)) return
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDob = (v: string) => {
    set('date_of_birth', v)
    if (!v) { setAgeError(''); return }
    const age = getAge(v)
    if (age < 7 || age > 17) setAgeError(`Age ${age} is outside the 7–17 range`)
    else { setAgeError(''); showToast(`Age: ${age} years ✓`) }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 5 * 1024 * 1024) { showToast('Photo must be under 5MB', true); return }
    setPhoto(f); setPhotoPreview(URL.createObjectURL(f))
  }

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhoto(null); setPhotoPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const openCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      streamRef.current = s; setCameraOpen(true)
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = s }, 100)
    } catch { showToast('Camera not available — please upload a photo', true) }
  }

  const closeCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null; setCameraOpen(false)
  }

  const snapPhoto = () => {
    const video = videoRef.current, canvas = canvasRef.current
    if (!video || !canvas) return
    canvas.width = video.videoWidth; canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')!
    ctx.save(); ctx.scale(-1, 1); ctx.drawImage(video, -canvas.width, 0); ctx.restore()
    canvas.toBlob(blob => {
      if (!blob) return
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' })
      setPhoto(file); setPhotoPreview(URL.createObjectURL(blob))
      closeCamera(); showToast('Photo captured ✓')
    }, 'image/jpeg', 0.85)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v) })
      if (photo) fd.append('photo', photo)
      const res = await fetch('/api/register', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok || !data.success) {
        showToast(data.error || 'Something went wrong', true)
        setSubmitting(false); return
      }
      setSuccessId(data.registration_id)
    } catch {
      showToast('Network error. Please try again.', true)
      setSubmitting(false)
    }
  }

  const reset = () => {
    setForm(INITIAL); setPhoto(null); setPhotoPreview(null)
    setSuccessId(null); setStep(1); setAgeError('')
  }

  if (successId) return (
    <div className={styles.successCard}>
      <div className={styles.successIcon}>✓</div>
      <h2 className={styles.successTitle}>Registration Complete</h2>
      <p className={styles.successText}>
        Your child has been successfully registered for Kids Build with AI 2.0.
        We will be in touch with your guardian shortly.
      </p>
      <div className={styles.regIdBox}>{successId}</div>
      <p className={styles.successNote}>Save this ID for your records · 🌍 See you at the program</p>
      <button className={styles.submitBtn} style={{ maxWidth: 260, marginTop: 8 }} onClick={reset}>
        Register Another Student
      </button>
    </div>
  )

  return (
    <>
      <div className={styles.card}>
        {/* Progress */}
        <div className={styles.progressBar}>
          {STEPS.map((label, i) => {
            const s = (i + 1) as Step
            return (
              <div key={s} className={`${styles.progressStep} ${step === s ? styles.active : ''} ${step > s ? styles.done : ''}`}>
                <div className={styles.stepNum}>{step > s ? '✓' : s}</div>
                <span>{label}</span>
              </div>
            )
          })}
        </div>

        <div className={styles.formBody}>

          {/* ── Step 1: Student ── */}
          {step === 1 && (
            <>
              <div className={styles.sectionLabel}>Student Information</div>
              <div className={styles.grid2}>
                <Field label="First Name" required>
                  <input className={styles.input} value={form.first_name}
                    onChange={e => set('first_name', e.target.value)} placeholder="First name" />
                </Field>
                <Field label="Last Name" required>
                  <input className={styles.input} value={form.last_name}
                    onChange={e => set('last_name', e.target.value)} placeholder="Last name" />
                </Field>
                <Field label="Date of Birth" required error={ageError}>
                  <input className={`${styles.input} ${ageError ? styles.inputError : ''}`}
                    type="date" value={form.date_of_birth} onChange={e => handleDob(e.target.value)} />
                </Field>
                <Field label="Gender">
                  <select className={styles.input} value={form.gender} onChange={e => set('gender', e.target.value)}>
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Prefer not to say</option>
                  </select>
                </Field>
                <Field label="State of Residence" required>
                  <select className={styles.input} value={form.state} onChange={e => set('state', e.target.value)}>
                    <option value="">Select state</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="LGA">
                  <input className={styles.input} value={form.lga}
                    onChange={e => set('lga', e.target.value)} placeholder="Local Government Area" />
                </Field>
                <Field label="Student Email" fullWidth>
                  <input className={styles.input} type="email" value={form.email}
                    onChange={e => set('email', e.target.value)} placeholder="Optional" />
                </Field>
                <Field label="Student Phone" fullWidth>
                  <input className={styles.input} type="tel" value={form.phone}
                    onChange={e => set('phone', e.target.value)} placeholder="Optional" />
                </Field>
              </div>
              <div className={styles.navRow}>
                <div />
                <button className={styles.btnPrimary} onClick={() => goTo(2)}>
                  Continue →
                </button>
              </div>
            </>
          )}

          {/* ── Step 2: Guardian ── */}
          {step === 2 && (
            <>
              <div className={styles.sectionLabel}>Parent / Guardian Details</div>
              <div className={styles.grid2}>
                <Field label="Full Name" required fullWidth>
                  <input className={styles.input} value={form.guardian_name}
                    onChange={e => set('guardian_name', e.target.value)} placeholder="Guardian's full name" />
                </Field>
                <Field label="Relationship">
                  <select className={styles.input} value={form.guardian_relationship}
                    onChange={e => set('guardian_relationship', e.target.value)}>
                    <option value="">Select</option>
                    <option>Mother</option><option>Father</option>
                    <option>Guardian</option><option>Sibling</option><option>Other</option>
                  </select>
                </Field>
                <Field label="Phone Number" required>
                  <input className={styles.input} type="tel" value={form.guardian_phone}
                    onChange={e => set('guardian_phone', e.target.value)} placeholder="+234 800 000 0000" />
                </Field>
                <Field label="Email Address" fullWidth>
                  <input className={styles.input} type="email" value={form.guardian_email}
                    onChange={e => set('guardian_email', e.target.value)} placeholder="Guardian's email" />
                </Field>
              </div>
              <div className={styles.navRow}>
                <button className={styles.btnSecondary} onClick={() => goTo(1)}>← Back</button>
                <button className={styles.btnPrimary} onClick={() => goTo(3)}>Continue →</button>
              </div>
            </>
          )}

          {/* ── Step 3: Academic ── */}
          {step === 3 && (
            <>
              <div className={styles.sectionLabel}>Academic Background</div>
              <div className={styles.grid2}>
                <Field label="School Name" fullWidth>
                  <input className={styles.input} value={form.school_name}
                    onChange={e => set('school_name', e.target.value)} placeholder="Name of school" />
                </Field>
                <Field label="Class / Grade">
                  <select className={styles.input} value={form.grade_class}
                    onChange={e => set('grade_class', e.target.value)}>
                    <option value="">Select</option>
                    {['Primary 1','Primary 2','Primary 3','Primary 4','Primary 5','Primary 6',
                      'JSS 1','JSS 2','JSS 3','SS 1','SS 2','SS 3'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Prior Tech Experience">
                  <select className={styles.input} value={form.prior_coding_experience}
                    onChange={e => set('prior_coding_experience', e.target.value)}>
                    <option value="">Select</option>
                    <option>None — complete beginner</option>
                    <option>Tried Scratch or Hour of Code</option>
                    <option>Basic Python or HTML</option>
                    <option>Intermediate — built small projects</option>
                    <option>Advanced</option>
                  </select>
                </Field>
                <Field label="How did you hear about us?" fullWidth>
                  <select className={styles.input} value={form.how_heard}
                    onChange={e => set('how_heard', e.target.value)}>
                    <option value="">Select</option>
                    <option>Social Media</option>
                    <option>WhatsApp / Telegram</option>
                    <option>School / Teacher</option>
                    <option>Friend or Family</option>
                    <option>REALMS Group website</option>
                    <option>YouTube</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>
              <div className={styles.navRow}>
                <button className={styles.btnSecondary} onClick={() => goTo(2)}>← Back</button>
                <button className={styles.btnPrimary} onClick={() => goTo(4)}>Continue →</button>
              </div>
            </>
          )}

          {/* ── Step 4: Photo ── */}
          {step === 4 && (
            <>
              <div className={styles.sectionLabel}>Student Photo</div>
              <div className={styles.photoRow}>
                <div className={styles.photoFrame} onClick={() => !photoPreview && fileRef.current?.click()}>
                  {photoPreview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photoPreview} alt="Preview" className={styles.photoPreview} />
                      <button className={styles.removePhotoBtn} onClick={removePhoto}>✕</button>
                    </>
                  ) : (
                    <>
                      <span className={styles.photoFrameIcon}>👤</span>
                      <span className={styles.photoFrameLabel}>ID Photo</span>
                    </>
                  )}
                </div>
                <div className={styles.photoActions}>
                  <button className={styles.photoActionBtn} onClick={openCamera}>
                    <span className={styles.photoActionIcon}>📷</span>
                    <span>Take Photo</span>
                  </button>
                  <button className={styles.photoActionBtn} onClick={() => fileRef.current?.click()}>
                    <span className={styles.photoActionIcon}>🖼️</span>
                    <span>Upload Photo</span>
                  </button>
                  <p className={styles.photoNote}>
                    Clear, front-facing photo recommended.<br />
                    JPG or PNG · Max 5MB · Optional
                  </p>
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />

              <div className={styles.submitArea}>
                <button className={styles.submitBtn} onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Complete Registration'}
                </button>
                <p className={styles.submitDisclaimer}>
                  By submitting you consent to storing this student's information for the
                  Kids Build with AI 2.0 program by REALMS Group Africa.
                </p>
              </div>
              <div className={styles.navRow} style={{ marginTop: 0, paddingTop: '1rem' }}>
                <button className={styles.btnSecondary} onClick={() => goTo(3)}>← Back</button>
                <div />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Camera */}
      {cameraOpen && (
        <div className={styles.cameraModal}>
          <p className={styles.cameraTitle}>Take Student Photo</p>
          <div className={styles.cameraFrame}>
            <video ref={videoRef} className={styles.liveVideo} autoPlay playsInline muted />
          </div>
          <div className={styles.cameraControls}>
            <button className={styles.cameraCancel} onClick={closeCamera}>Cancel</button>
            <button className={styles.shutterBtn} onClick={snapPhoto} aria-label="Capture" />
          </div>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`${styles.toast} ${toast.error ? styles.toastError : ''}`}>
          {toast.msg}
        </div>
      )}
    </>
  )
}

function Field({ label, required, error, fullWidth, children }: {
  label: string; required?: boolean; error?: string; fullWidth?: boolean; children: React.ReactNode
}) {
  return (
    <div className={fullWidth ? styles.fieldFull : styles.field}>
      <label className={styles.label}>
        {label}{required && <span className={styles.req}>*</span>}
      </label>
      {children}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
}
