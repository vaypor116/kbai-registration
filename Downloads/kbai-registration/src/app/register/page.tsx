import Link from 'next/link'
import styles from './landing.module.css'

export default function RegisterLandingPage() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.logoGroup}>
          <div className={styles.logoBadge}>R</div>
          <div className={styles.logoText}>
            <strong>REALMS Group Africa</strong>
            <span>TheWHY Africa Initiative</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.headerDot} />
          Registration Open
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleBlock}>
          <h1>Kids Build with <span>AI</span> 2.0</h1>
          <p>Choose how you'd like to be part of the program.</p>
        </div>

        <div className={styles.cardGrid}>
          <Link href="/register/student" className={styles.choiceCard}>
            <div className={styles.choiceIcon}>🎓</div>
            <h2>Register as a Student</h2>
            <p>For children and teens ages 7–17 joining the AI training program.</p>
            <span className={styles.choiceCta}>Start registration →</span>
          </Link>

          <Link href="/register/volunteer" className={styles.choiceCard}>
            <div className={styles.choiceIcon}>🤝</div>
            <h2>Register as a Volunteer</h2>
            <p>For tutors, mentors and assistants who want to support the program.</p>
            <span className={styles.choiceCta}>Start registration →</span>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        © 2025 REALMS Group Africa · TheWHY Africa Initiative · Kids Build with AI 2.0
      </footer>
    </div>
  )
}
