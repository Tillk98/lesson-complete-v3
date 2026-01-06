import React, { useState, useRef, useEffect } from 'react'
import { ArrowUp, Check } from 'lucide-react'
import styles from './BottomActions.module.css'
import upArrowIcon from '../assets/up-arrow.png'

interface BottomActionsProps {
  visible?: boolean
  onScrollToTop?: () => void
  onSendMessage?: (message: string, referencedMessageId?: number) => void
  referencedMessage?: { id: number; content: string } | null
  onClearReference?: () => void
  language?: 'en' | 'fr'
  onLanguageChange?: (language: 'en' | 'fr') => void
}

const BottomActions: React.FC<BottomActionsProps> = ({ 
  visible = true, 
  onScrollToTop, 
  onSendMessage,
  referencedMessage,
  onClearReference,
  language = 'en',
  onLanguageChange
}) => {
  const [inputValue, setInputValue] = useState('')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)

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

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  const handleLanguageSelect = (selectedLanguage: 'en' | 'fr') => {
    if (onLanguageChange && selectedLanguage !== language) {
      onLanguageChange(selectedLanguage)
    }
    setIsLanguageMenuOpen(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
    }

    if (isLanguageMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLanguageMenuOpen])

  return (
    <div className={`${styles.container} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.inputWrapper}>
        <button className={styles.scrollToTopButton} onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp size={20} />
        </button>
        <div className={styles.languageMenuWrapper} ref={languageMenuRef}>
          {!isLanguageMenuOpen && (
            <button 
              className={styles.languageToggleButton} 
              onClick={toggleLanguageMenu} 
              aria-label="Toggle language menu"
              aria-expanded={isLanguageMenuOpen}
            >
              <span className={styles.flagEmoji}>{language === 'en' ? '🇺🇸' : '🇫🇷'}</span>
              <span className={styles.languageCode}>{language === 'en' ? 'EN' : 'FR'}</span>
            </button>
          )}
          
          <div className={`${styles.languageMenu} ${isLanguageMenuOpen ? styles.languageMenuOpen : ''}`}>
            <button 
              className={styles.languageMenuItem}
              onClick={() => handleLanguageSelect('en')}
            >
              <span className={styles.languageItemLeft}>
                <span className={styles.flagEmoji}>🇺🇸</span>
                <span className={styles.languageItemText}>English</span>
              </span>
              {language === 'en' && (
                <Check className={styles.checkIcon} size={18} />
              )}
            </button>
            
            <button 
              className={styles.languageMenuItem}
              onClick={() => handleLanguageSelect('fr')}
            >
              <span className={styles.languageItemLeft}>
                <span className={styles.flagEmoji}>🇫🇷</span>
                <span className={styles.languageItemText}>French</span>
              </span>
              {language === 'fr' && (
                <Check className={styles.checkIcon} size={18} />
              )}
            </button>
            
            <div className={styles.languageMenuDivider} />
            
            <div className={styles.languageMenuItemInactive}>
              <span className={styles.languageItemLeft}>
                <span className={styles.flagEmoji}>🇨🇳</span>
                <span className={styles.languageItemText}>Chinese</span>
              </span>
            </div>
            
            <div className={styles.languageMenuItemInactive}>
              <span className={styles.languageItemLeft}>
                <span className={styles.flagEmoji}>🇩🇪</span>
                <span className={styles.languageItemText}>German</span>
              </span>
            </div>
          </div>
        </div>
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

