import React from 'react'
import styles from './BottomActions.module.css'
import chatIcon from '../assets/lynx-icon.png'
import reviewIcon from '../assets/Review Icon.png'

interface BottomActionsProps {
  visible?: boolean
}

const BottomActions: React.FC<BottomActionsProps> = ({ visible = true }) => {
  return (
    <div className={`${styles.container} ${visible ? styles.visible : styles.hidden}`}>
      <button className={styles.primaryButton}>
        <span>Continue to Next Lesson</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      <div className={styles.secondaryActions}>
        <button className={styles.secondaryButton}>
          <img src={reviewIcon} alt="Review" className={styles.buttonIcon} />
          <span className={styles.buttonText}>Review</span>
        </button>
        
        <button className={styles.secondaryButton}>
          <img src={chatIcon} alt="Chat" className={styles.buttonIcon} />
          <span className={styles.buttonText}>Chat</span>
        </button>
      </div>
    </div>
  )
}

export default BottomActions

