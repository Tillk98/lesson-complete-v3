import React from 'react'
import styles from './TypingIndicator.module.css'

const TypingIndicator: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <div className={styles.typingDots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.typingText}>Lynx is thinking...</span>
      </div>
    </div>
  )
}

export default TypingIndicator

