import React from 'react'
import { ArrowUp } from 'lucide-react'
import styles from './BottomActions.module.css'
import upArrowIcon from '../assets/up-arrow.png'

interface BottomActionsProps {
  visible?: boolean
  onScrollToTop?: () => void
}

const BottomActions: React.FC<BottomActionsProps> = ({ visible = true, onScrollToTop }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Disable auto-scroll when user clicks up arrow
    if (onScrollToTop) {
      onScrollToTop()
    }
  }

  return (
    <div className={`${styles.container} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.inputWrapper}>
        <button className={styles.scrollToTopButton} onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp size={20} />
        </button>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Message Lynx AI …"
            className={styles.inputField}
            readOnly
          />
          <button className={styles.sendButton} aria-label="Send message">
            <img src={upArrowIcon} alt="Send" className={styles.sendIconImage} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BottomActions

