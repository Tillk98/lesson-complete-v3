import React from 'react'
import { translateText, type Language } from '../utils/translations'
import styles from './TypingIndicator.module.css'

interface TypingIndicatorProps {
  language?: Language
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ language = 'en' }) => {
  return (
    <div className={styles.container}>
      <div className={styles.message}>
        <div className={styles.typingDots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <span className={styles.typingText}>{translateText('Lynx is thinking...', language)}</span>
      </div>
    </div>
  )
}

export default TypingIndicator

