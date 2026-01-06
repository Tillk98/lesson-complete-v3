import React from 'react'
import styles from './Header.module.css'
import lynxIcon from '../assets/lynx-icon.png'
import coinIcon from '../assets/coin-icon.png'
import flameIcon from '../assets/flame-icon.png'

interface HeaderProps {
  showBreadcrumb?: boolean
  lesson?: {
    title: string
    subtitle: string
  }
  stats?: {
    streak: number
    coins: number
    coinsTotal: number
  }
}

const Header: React.FC<HeaderProps> = ({ showBreadcrumb = false, lesson, stats }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <button className={styles.backButton} aria-label="Back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <div className={styles.lynxBrand}>
          <div className={styles.lynxIcon}>
            <img src={lynxIcon} alt="Lynx AI" className={styles.lynxImage} />
          </div>
          <span className={styles.lynxText}>Lynx AI</span>
        </div>
        
        <button className={styles.menuButton} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="6" r="1.5" fill="currentColor" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            <circle cx="12" cy="18" r="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>
      
      {showBreadcrumb && (
        <div className={`${styles.lessonBreadcrumb} ${styles.breadcrumbVisible}`}>
          <div className={styles.breadcrumbLeft}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#42a564" stroke="white" strokeWidth="2" />
              <path
                d="M8 12l2 2 4-4"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={styles.breadcrumbText}>
              {lesson?.title || 'Prendre un Café'}
            </span>
          </div>
          <button className={styles.statsLink}>
            <div className={styles.streakContainer}>
              <img src={flameIcon} alt="Streak" className={styles.flameIcon} />
              <span className={styles.streakText}>{stats?.streak || 5}</span>
            </div>
            <div className={styles.coinsContainer}>
              <img src={coinIcon} alt="Coins" className={styles.coinIcon} />
              <span className={styles.coinsText}>
                {stats?.coins || 15}/{stats?.coinsTotal || 100}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

export default Header

