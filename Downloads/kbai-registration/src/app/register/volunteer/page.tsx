import Link from 'next/link'
import VolunteerForm from '@/components/VolunteerForm'
import styles from './volunteer.module.css'

export default function VolunteerRegisterPage() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <Link href="/register" className={styles.logoGroup}>
          <div className={styles.logoBadge}>R</div>
          <div className={styles.logoText}>
            <strong>REALMS Group Africa</strong>
            <span>TheWHY Africa Initiative</span>
          </div>
        </Link>
        <div className={styles.headerRight}>
          <span className={styles.headerDot} />
          Volunteers Needed
        </div>
      </header>

      <main className={styles.main}>
        <Link href="/register" className={styles.backLink}>← All registration options</Link>
        <div className={styles.programTitle}>
          <h1>Volunteer with <span>Kids Build with AI</span></h1>
          <p>Share your time and skills to help shape the next generation of African builders.</p>
          <div className={styles.ageLine}>Tutors · Mentors · Assistants Welcome</div>
        </div>

        <VolunteerForm />
      </main>

      <footer className={styles.footer}>
        © 2025 REALMS Group Africa · TheWHY Africa Initiative · Kids Build with AI 2.0
      </footer>
    </div>
  )
}
