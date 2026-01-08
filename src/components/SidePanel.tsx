import React from 'react'
import { Search, MessageSquare } from 'lucide-react'
import styles from './SidePanel.module.css'
import lynxIcon from '../assets/lynx-icon.png'
import panelRightOpenIcon from '../assets/panel-right-open.png'
import panelRightCloseIcon from '../assets/panel-right-close.png'

interface SidePanelProps {
  isOpen: boolean
  onToggle: () => void
}

const SidePanel: React.FC<SidePanelProps> = ({ isOpen, onToggle }) => {
  return (
    <div className={`${styles.sidePanel} ${isOpen ? styles.open : styles.closed}`}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logoSection}>
            <img src={lynxIcon} alt="Lynx" className={styles.lynxLogo} />
          </div>
          <div className={styles.headerActions}>
            {isOpen && (
              <div className={styles.searchContainer}>
                <button className={styles.searchButton}>
                  <Search size={24} />
                </button>
                <input 
                  type="text" 
                  placeholder="Search" 
                  className={styles.searchInput}
                />
              </div>
            )}
            <button className={styles.panelToggle} onClick={onToggle}>
              <img 
                src={isOpen ? panelRightOpenIcon : panelRightCloseIcon} 
                alt={isOpen ? "Close panel" : "Open panel"}
                className={styles.toggleIcon}
              />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className={styles.importButtonContainer}>
            <button className={styles.importButton}>Import</button>
          </div>
        )}
      </div>

      {/* Navigation */}
      {isOpen && (
        <nav className={styles.nav}>
          <div className={styles.navSection}>
            <a href="/en/lynx" className={styles.newChatButton}>
              <MessageSquare size={16} />
              <h2 className={styles.newChatText}>New Chat</h2>
            </a>
          </div>

          <div className={styles.chatHistory}>
          <div className={styles.chatGroup}>
            <div className={styles.chatGroupHeader}>
              <span>Today</span>
            </div>
            <ol className={styles.chatList}>
              <li>
                <a href="/en/lynx/c/66970" className={styles.chatLink}>
                  Découverte de la Technologie de Chat Interactif
                </a>
              </li>
            </ol>
          </div>

          <div className={styles.chatGroup}>
            <div className={styles.chatGroupHeader}>
              <span>Previous 7 Days</span>
            </div>
            <ol className={styles.chatList}>
              <li>
                <a href="/en/lynx/c/66462" className={styles.chatLink}>
                  January 06 10:51
                </a>
              </li>
            </ol>
          </div>

          <div className={styles.chatGroup}>
            <div className={styles.chatGroupHeader}>
              <span>2025</span>
            </div>
            <ol className={styles.chatList}>
              <li>
                <a href="/en/lynx/c/43318" className={styles.chatLink}>
                  Discuter: # 24 Steve & Matthieu - Le Podcast High Tech
                </a>
              </li>
              <li>
                <a href="/en/lynx/c/43313" className={styles.chatLink}>
                  Discuter: # 24 Steve & Matthieu - Le Podcast High Tech
                </a>
              </li>
              <li>
                <a href="/en/lynx/c/37314" className={styles.chatLink}>
                  September 17 22:10
                </a>
              </li>
              <li>
                <a href="/en/lynx/c/35305" className={styles.chatLink}>
                  Discuter: (#32) Pratiquer le français avec d'autres apprenants - YouTube
                </a>
              </li>
            </ol>
          </div>
        </div>
        </nav>
      )}
    </div>
  )
}

export default SidePanel
