import React from 'react'
import styles from './Header.module.css'
import lynxIcon from '../assets/lynx-icon.png'

interface HeaderProps {
  showBreadcrumb?: boolean
  lesson?: {
    title: string
    subtitle: string
  }
}

const Header: React.FC<HeaderProps> = ({ showBreadcrumb = false, lesson }) => {
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
            {lesson?.title || 'Prendre un Café'} • <span className={styles.breadcrumbSubtext}>{lesson?.subtitle || 'LingQ Mini Stories - French'}</span>
          </span>
        </div>
      )}
    </div>
  )
}

export default Header

