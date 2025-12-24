import React from 'react'
import { ArrowUp } from 'lucide-react'
import styles from './BottomActions.module.css'
import chatIcon from '../assets/lynx-icon.png'
import reviewIcon from '../assets/Review Icon.png'

interface BottomActionsProps {
  visible?: boolean
}

const BottomActions: React.FC<BottomActionsProps> = ({ visible = true }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`${styles.container} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.primaryButtonWrapper}>
        <button className={styles.scrollToTopButton} onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp size={20} />
        </button>
        <button className={styles.primaryButton}>
        <span>Continue to Next Lesson</span>
      </button>
      </div>
      
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

