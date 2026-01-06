import React, { useState } from 'react'
import { ArrowUp } from 'lucide-react'
import styles from './BottomActions.module.css'
import upArrowIcon from '../assets/up-arrow.png'

interface BottomActionsProps {
  visible?: boolean
  onScrollToTop?: () => void
  onSendMessage?: (message: string, referencedMessageId?: number) => void
  referencedMessage?: { id: number; content: string } | null
  onClearReference?: () => void
}

const BottomActions: React.FC<BottomActionsProps> = ({ 
  visible = true, 
  onScrollToTop, 
  onSendMessage,
  referencedMessage,
  onClearReference
}) => {
  const [inputValue, setInputValue] = useState('')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Disable auto-scroll when user clicks up arrow
    if (onScrollToTop) {
      onScrollToTop()
    }
  }

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim(), referencedMessage?.id)
      setInputValue('')
      if (onClearReference) {
        onClearReference()
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className={`${styles.container} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.inputWrapper}>
        <button className={styles.scrollToTopButton} onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp size={20} />
        </button>
        {referencedMessage && (
          <div className={styles.referenceContainer}>
            <div className={styles.referenceContent}>
              <span className={styles.referenceText}>{referencedMessage.content}</span>
              <button 
                className={styles.clearReferenceButton} 
                onClick={onClearReference}
                aria-label="Clear reference"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Message Lynx AI …"
            className={styles.inputField}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className={styles.sendButton} onClick={handleSend} aria-label="Send message" disabled={!inputValue.trim()}>
            <img src={upArrowIcon} alt="Send" className={styles.sendIconImage} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BottomActions

