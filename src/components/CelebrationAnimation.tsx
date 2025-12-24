import React from 'react'
import styles from './CelebrationAnimation.module.css'

const CelebrationAnimation: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.checkmarkContainer}>
          <div className={styles.checkmark}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#42a564" stroke="white" strokeWidth="2" />
              <path
                d="M8 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 className={styles.title}>Lesson Complete!</h1>
        <div className={styles.confetti}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={styles.confettiPiece}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#42a564', '#2e75cd', '#ff603d', '#ffd700'][Math.floor(Math.random() * 4)],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CelebrationAnimation

