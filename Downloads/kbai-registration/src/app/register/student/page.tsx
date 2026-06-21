import Link from 'next/link'
import RegistrationForm from '@/components/RegistrationForm'
import styles from './student.module.css'

export default function StudentRegisterPage() {
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
          Registration Open
        </div>
      </header>

      <main className={styles.main}>
        <Link href="/register" className={styles.backLink}>← All registration options</Link>
        <div className={styles.programTitle}>
          <h1>Kids Build with <span>AI</span> 2.0</h1>
          <p>Complete the form below to secure your child's place in the program.</p>
          <div className={styles.ageLine}>Ages 7 – 17 · STEM & AI Training</div>
        </div>

        <RegistrationForm />
      </main>

      <footer className={styles.footer}>
        © 2025 REALMS Group Africa · TheWHY Africa Initiative · Kids Build with AI 2.0
      </footer>
    </div>
  )
}
