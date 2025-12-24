import React from 'react'
import styles from './TypingIndicator.module.css'
import lynxIcon from '../assets/lynx-icon.png'

const TypingIndicator: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lynxHeader}>
        <div className={styles.lynxIcon}>
          <img src={lynxIcon} alt="Lynx AI" className={styles.lynxImage} />
        </div>
        <span className={styles.lynxText}>Lynx AI</span>
      </div>
      
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

