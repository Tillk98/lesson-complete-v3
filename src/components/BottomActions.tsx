import React, { useState, useRef, useEffect } from 'react'
import { ArrowUp, Check } from 'lucide-react'
import styles from './BottomActions.module.css'
import upArrowIcon from '../assets/up-arrow.png'
import standardIcon from '../assets/standard.png'
import plusIcon from '../assets/plus.png'
import tutorIcon from '../assets/tutor.png'

interface BottomActionsProps {
  visible?: boolean
  onScrollToTop?: () => void
  onSendMessage?: (message: string, referencedMessageId?: number) => void
  referencedMessage?: { id: number; content: string } | null
  onClearReference?: () => void
  language?: 'en' | 'fr'
  onLanguageChange?: (language: 'en' | 'fr') => void
  sidePanelOpen?: boolean
}

const BottomActions: React.FC<BottomActionsProps> = ({ 
  visible = true, 
  onScrollToTop, 
  onSendMessage,
  referencedMessage,
  onClearReference,
  language = 'en',
  onLanguageChange,
  sidePanelOpen = false
}) => {
  const [inputValue, setInputValue] = useState('')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false)
  const [currentMode, setCurrentMode] = useState<'standard' | 'plus' | 'tutor'>('standard')
  const languageMenuRef = useRef<HTMLDivElement>(null)
  const modeMenuRef = useRef<HTMLDivElement>(null)

  const scrollToTop = () => {
    // On web, the main content area is scrollable, not the window
    if (window.innerWidth >= 1024) {
      // Find the scrollable main content container
      // It's the div with overflow-y: auto inside the webLayout
      const webLayout = document.querySelector('[class*="webLayout"]')
      if (webLayout && webLayout.children.length > 1) {
        // Second child should be mainContent (first is SidePanel)
        const mainContentDiv = webLayout.children[1] as HTMLElement
        if (mainContentDiv) {
          mainContentDiv.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // On mobile, scroll the window
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
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
    if (isModeMenuOpen) {
      setIsModeMenuOpen(false)
    }
  }

  const handleLanguageSelect = (selectedLanguage: 'en' | 'fr') => {
    if (onLanguageChange && selectedLanguage !== language) {
      onLanguageChange(selectedLanguage)
    }
    setIsLanguageMenuOpen(false)
  }

  const toggleModeMenu = () => {
    setIsModeMenuOpen(!isModeMenuOpen)
    if (isLanguageMenuOpen) {
      setIsLanguageMenuOpen(false)
    }
  }

  const handleModeSelect = (selectedMode: 'standard' | 'plus' | 'tutor') => {
    setCurrentMode(selectedMode)
    setIsModeMenuOpen(false)
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false)
      }
      if (modeMenuRef.current && !modeMenuRef.current.contains(event.target as Node)) {
        setIsModeMenuOpen(false)
      }
    }

    if (isLanguageMenuOpen || isModeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLanguageMenuOpen, isModeMenuOpen])

  return (
    <div className={`${styles.container} ${visible ? styles.visible : styles.hidden} ${sidePanelOpen ? styles.sidePanelOpen : styles.sidePanelClosed}`}>
      <div className={styles.inputWrapper}>
        <button className={styles.scrollToTopButton} onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp size={20} />
        </button>
        <div className={styles.modeMenuWrapper} ref={modeMenuRef}>
          {!isModeMenuOpen && (
            <button 
              className={styles.modeToggleButton} 
              onClick={toggleModeMenu} 
              aria-label="Toggle mode menu"
              aria-expanded={isModeMenuOpen}
            >
              <img 
                src={currentMode === 'standard' ? standardIcon : currentMode === 'plus' ? plusIcon : tutorIcon} 
                alt={currentMode}
                className={styles.modeIcon}
              />
              <span className={styles.modeName}>
                {currentMode === 'standard' ? 'Standard' : currentMode === 'plus' ? 'Plus' : 'Tutor'}
              </span>
            </button>
          )}
          
          <div className={`${styles.modeMenu} ${isModeMenuOpen ? styles.modeMenuOpen : ''}`}>
            <button 
              className={`${styles.modeMenuItem} ${currentMode === 'standard' ? styles.modeMenuItemSelected : ''}`}
              onClick={() => handleModeSelect('standard')}
            >
              <div className={styles.modeItemContent}>
                <img src={standardIcon} alt="Standard" className={styles.modeItemIcon} />
                <div className={styles.modeItemText}>
                  <span className={styles.modeItemTitle}>Standard</span>
                  <span className={styles.modeItemDescription}>Conversational AI chatbot</span>
                </div>
              </div>
              {currentMode === 'standard' && (
                <Check className={styles.checkIcon} size={18} />
              )}
            </button>
            
            <button 
              className={`${styles.modeMenuItem} ${currentMode === 'plus' ? styles.modeMenuItemSelected : ''}`}
              onClick={() => handleModeSelect('plus')}
            >
              <div className={styles.modeItemContent}>
                <img src={plusIcon} alt="Plus" className={styles.modeItemIcon} />
                <div className={styles.modeItemText}>
                  <span className={styles.modeItemTitle}>
                    Plus <span className={styles.sparkle}>✨</span>
                  </span>
                  <span className={styles.modeItemDescription}>Chat with enhanced AI engine + voice</span>
                </div>
              </div>
              {currentMode === 'plus' && (
                <Check className={styles.checkIcon} size={18} />
              )}
            </button>
            
            <button 
              className={`${styles.modeMenuItem} ${currentMode === 'tutor' ? styles.modeMenuItemSelected : ''}`}
              onClick={() => handleModeSelect('tutor')}
            >
              <div className={styles.modeItemContent}>
                <img src={tutorIcon} alt="Tutor" className={styles.modeItemIcon} />
                <div className={styles.modeItemText}>
                  <span className={styles.modeItemTitle}>
                    Tutor <span className={styles.sparkle}>✨</span>
                  </span>
                  <span className={styles.modeItemDescription}>Detailed chat with enhanced AI engine + voice</span>
                </div>
              </div>
              {currentMode === 'tutor' && (
                <Check className={styles.checkIcon} size={18} />
              )}
            </button>
          </div>
        </div>
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

