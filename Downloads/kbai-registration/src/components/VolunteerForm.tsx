'use client'

import { useState, useCallback, useRef } from 'react'
import styles from './RegistrationForm.module.css'

type Step = 1 | 2 | 3

interface VolForm {
  first_name: string; last_name: string; email: string; phone: string
  state: string; occupation: string
  role_type: string[]
  areas_of_expertise: string[]
  other_expertise: string
  availability: string
  days_available: string[]
  has_volunteered_before: string
  motivation: string
  how_heard: string
}

const INITIAL: VolForm = {
  first_name: '', last_name: '', email: '', phone: '',
  state: '', occupation: '',
  role_type: [],
  areas_of_expertise: [],
  other_expertise: '',
  availability: '',
  days_available: [],
  has_volunteered_before: '',
  motivation: '',
  how_heard: '',
}

const STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT — Abuja','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
  'Taraba','Yobe','Zamfara',
]

const ROLE_TYPES = [
  { id: 'tutor', label: 'Tutor', desc: 'Lead or co-lead a teaching session' },
  { id: 'mentor', label: 'Mentor', desc: 'Guide and support individual students' },
  { id: 'assistant', label: 'Assistant', desc: 'Help with logistics, materials, and supervision' },
  { id: 'other', label: 'Other', desc: 'A different kind of support' },
]

const EXPERTISE_AREAS = [
  'AI & Machine Learning', 'Programming / Coding', 'Robotics & Hardware',
  'Graphic Design', 'Video & Photography', 'Public Speaking',
  'Curriculum Development', 'Event Planning', 'Mentorship & Counselling',
  'Marketing & Social Media', 'Other',
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const STEPS = ['About You', 'Your Skills', 'Availability']

export default function VolunteerForm() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<VolForm>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [successId, setSuccessId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((msg: string, error = false) => {
    setToast({ msg, error })
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 3000)
  }, [])

  const set = (k: keyof VolForm, v: string) => setForm(p => ({ ...p, [k]: v }))

  const toggleArrayValue = (k: 'role_type' | 'areas_of_expertise' | 'days_available', value: string) => {
    setForm(prev => {
      const arr = prev[k]
      const exists = arr.includes(value)
      return { ...prev, [k]: exists ? arr.filter(v => v !== value) : [...arr, value] }
    })
  }

  const validate = (s: Step) => {
    if (s === 1) {
      if (!form.first_name || !form.last_name || !form.phone || !form.state) {
        showToast('Please fill in all required fields', true); return false
      }
    }
    if (s === 2) {
      if (form.role_type.length === 0) {
        showToast('Please select at least one role', true); return false
      }
      if (form.areas_of_expertise.length === 0) {
        showToast('Please select at least one area you can help with', true); return false
      }
    }
    return true
  }

  const goTo = (n: Step) => {
    if (n > step && !validate(step)) return
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!form.availability) {
      showToast('Please select your general availability', true); return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/register-volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
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
    setForm(INITIAL); setSuccessId(null); setStep(1)
  }

  if (successId) return (
    <div className={styles.successCard}>
      <div className={styles.successIcon}>✓</div>
      <h2 className={styles.successTitle}>Thank You for Volunteering</h2>
      <p className={styles.successText}>
        Your application has been received. Our team will review it and reach out
        with next steps and onboarding details.
      </p>
      <div className={styles.regIdBox}>{successId}</div>
      <p className={styles.successNote}>Save this ID for your records · 🌍 We appreciate your support</p>
      <button className={styles.submitBtn} style={{ maxWidth: 260, marginTop: 8 }} onClick={reset}>
        Submit Another Application
      </button>
    </div>
  )

  return (
    <>
      <div className={styles.card}>
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

          {/* ── Step 1: About You ── */}
          {step === 1 && (
            <>
              <div className={styles.sectionLabel}>About You</div>
              <div className={styles.grid2}>
                <Field label="First Name" required>
                  <input className={styles.input} value={form.first_name}
                    onChange={e => set('first_name', e.target.value)} placeholder="First name" />
                </Field>
                <Field label="Last Name" required>
                  <input className={styles.input} value={form.last_name}
                    onChange={e => set('last_name', e.target.value)} placeholder="Last name" />
                </Field>
                <Field label="Email Address">
                  <input className={styles.input} type="email" value={form.email}
                    onChange={e => set('email', e.target.value)} placeholder="you@email.com" />
                </Field>
                <Field label="Phone Number" required>
                  <input className={styles.input} type="tel" value={form.phone}
                    onChange={e => set('phone', e.target.value)} placeholder="+234 800 000 0000" />
                </Field>
                <Field label="State of Residence" required>
                  <select className={styles.input} value={form.state} onChange={e => set('state', e.target.value)}>
                    <option value="">Select state</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Occupation / Profession">
                  <input className={styles.input} value={form.occupation}
                    onChange={e => set('occupation', e.target.value)} placeholder="e.g. Software Engineer" />
                </Field>
              </div>
              <div className={styles.navRow}>
                <div />
                <button className={styles.btnPrimary} onClick={() => goTo(2)}>Continue →</button>
              </div>
            </>
          )}

          {/* ── Step 2: Skills ── */}
          {step === 2 && (
            <>
              <div className={styles.sectionLabel}>How Would You Like to Help?</div>
              <div className={styles.field} style={{ marginBottom: '1.5rem' }}>
                <span className={styles.label}>Select Role(s) <span className={styles.req}>*</span></span>
                <CheckGrid
                  options={ROLE_TYPES}
                  selected={form.role_type}
                  onToggle={v => toggleArrayValue('role_type', v)}
                />
              </div>

              <div className={styles.field}>
                <span className={styles.label}>
                  Areas You Can Support <span className={styles.req}>*</span>
                </span>
                <PillGrid
                  options={EXPERTISE_AREAS}
                  selected={form.areas_of_expertise}
                  onToggle={v => toggleArrayValue('areas_of_expertise', v)}
                />
              </div>

              {form.areas_of_expertise.includes('Other') && (
                <Field label="Tell us more" fullWidth>
                  <input className={styles.input} value={form.other_expertise}
                    onChange={e => set('other_expertise', e.target.value)}
                    placeholder="Describe what you can offer" />
                </Field>
              )}

              <div className={styles.navRow}>
                <button className={styles.btnSecondary} onClick={() => goTo(1)}>← Back</button>
                <button className={styles.btnPrimary} onClick={() => goTo(3)}>Continue →</button>
              </div>
            </>
          )}

          {/* ── Step 3: Availability ── */}
          {step === 3 && (
            <>
              <div className={styles.sectionLabel}>Availability & Motivation</div>
              <div className={styles.grid2}>
                <Field label="General Availability" required fullWidth>
                  <select className={styles.input} value={form.availability}
                    onChange={e => set('availability', e.target.value)}>
                    <option value="">Select</option>
                    <option>Weekdays only</option>
                    <option>Weekends only</option>
                    <option>Weekdays and weekends</option>
                    <option>One-off / occasional sessions only</option>
                    <option>Fully flexible</option>
                  </select>
                </Field>

                <div className={styles.fieldFull}>
                  <span className={styles.label}>Preferred Days (optional)</span>
                  <PillGrid
                    options={DAYS}
                    selected={form.days_available}
                    onToggle={v => toggleArrayValue('days_available', v)}
                  />
                </div>

                <Field label="Have you volunteered with us before?" fullWidth>
                  <select className={styles.input} value={form.has_volunteered_before}
                    onChange={e => set('has_volunteered_before', e.target.value)}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </Field>

                <Field label="Why do you want to volunteer with us?" fullWidth>
                  <textarea className={styles.input} style={{ minHeight: 90, resize: 'vertical' }}
                    value={form.motivation} onChange={e => set('motivation', e.target.value)}
                    placeholder="Tell us briefly what motivates you to support this program" />
                </Field>

                <Field label="How did you hear about us?" fullWidth>
                  <select className={styles.input} value={form.how_heard}
                    onChange={e => set('how_heard', e.target.value)}>
                    <option value="">Select</option>
                    <option>Social Media</option>
                    <option>WhatsApp / Telegram</option>
                    <option>Friend or Family</option>
                    <option>REALMS Group website</option>
                    <option>YouTube</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>

              <div className={styles.submitArea}>
                <button className={styles.submitBtn} onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
                <p className={styles.submitDisclaimer}>
                  By submitting you consent to storing your information for volunteer
                  coordination with Kids Build with AI 2.0 by REALMS Group Africa.
                </p>
              </div>
              <div className={styles.navRow} style={{ marginTop: 0, paddingTop: '1rem' }}>
                <button className={styles.btnSecondary} onClick={() => goTo(2)}>← Back</button>
                <div />
              </div>
            </>
          )}
        </div>
      </div>

      {toast && (
        <div className={`${styles.toast} ${toast.error ? styles.toastError : ''}`}>
          {toast.msg}
        </div>
      )}
    </>
  )
}

function Field({ label, required, fullWidth, children }: {
  label: string; required?: boolean; fullWidth?: boolean; children: React.ReactNode
}) {
  return (
    <div className={fullWidth ? styles.fieldFull : styles.field}>
      <label className={styles.label}>
        {label}{required && <span className={styles.req}>*</span>}
      </label>
      {children}
    </div>
  )
}

function CheckGrid({ options, selected, onToggle }: {
  options: { id: string; label: string; desc: string }[]
  selected: string[]
  onToggle: (id: string) => void
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
      {options.map(opt => {
        const active = selected.includes(opt.id)
        return (
          <button
            type="button"
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            style={{
              textAlign: 'left',
              border: `1px solid ${active ? 'var(--accent)' : 'var(--grey-border)'}`,
              background: active ? 'var(--accent-bg)' : 'var(--white)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: active ? 'var(--accent)' : 'var(--charcoal)' }}>
              {active ? '✓ ' : ''}{opt.label}
            </div>
            <div style={{ fontSize: 11, color: 'var(--grey-mid)', marginTop: 2 }}>{opt.desc}</div>
          </button>
        )
      })}
    </div>
  )
}

function PillGrid({ options, selected, onToggle }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
      {options.map(opt => {
        const active = selected.includes(opt)
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onToggle(opt)}
            style={{
              border: `1px solid ${active ? 'var(--accent)' : 'var(--grey-border)'}`,
              background: active ? 'var(--accent-bg)' : 'var(--white)',
              color: active ? 'var(--accent)' : 'var(--grey-dark)',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {active ? '✓ ' : ''}{opt}
          </button>
        )
      })}
    </div>
  )
}
