import React, { useState } from 'react'
import { Menu, ChevronDown } from 'lucide-react'
import styles from './WebHeader.module.css'
import coinProgressIcon from '../assets/coin-progress-icon.png'

const WebHeader: React.FC = () => {
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.sidebarIcon}>
        <a className={styles.menuButton} href="#" aria-label="Menu">
          <Menu size={20} />
        </a>
      </div>
      
      <a href="/en/learn/fr/web/library" className={styles.logoLink}>
        <svg 
          className={styles.logo} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 740 225" 
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path d="M113.3,0h0s-67,0-67,0h0c-12.5.7-24.2,6.2-32.8,15.3C4.8,24.4,0,36.4,0,48.9v.7c0,5,.4,10.7,1.1,16,.7,5.3,1.8,10.2,3.4,13.4,3,6.4,7.3,12.1,12.6,16.7l85.7,91.7c.6.7,1.3,1.2,2.1,1.6h0c.8.4,1.7.6,2.6.6.9,0,1.7-.1,2.5-.4.8-.3,1.5-.8,2.2-1.4.6-.6,1.1-1.3,1.5-2.1h0c.3-.8.5-1.6.5-2.5h0v-77.2c12.2-.8,23.6-6.1,32-15,8.7-9.1,13.4-22.3,13.4-38s-4.8-29-13.4-38C137.6,6,125.8.6,113.3,0ZM111.6,83.6c6.5-.4,12.5-3.3,17-8.1,4.4-4.7,6.7-13.1,6.7-22.1s-2.7-17.3-7.2-21.9c-4.5-4.7-10.7-7.4-17.2-7.7h-62.8c-6.5.5-12.5,3.5-16.9,8.2-2.2,2.4-4,4.8-5.1,7.6-1.2,2.8-1.8,5.9-1.8,9.9v.7c0,4.4.1,7.9.3,10.5.2,2.6.5,4.4.8,5.4,2.2,6.9,7.4,12.3,12.5,17.6.2.2.5.5.7.7l52.9,56.4v-45.5h0c0-3.2,1.3-6.2,3.5-8.4,2.2-2.2,5.2-3.5,8.4-3.5h0s8.1,0,8.1,0Z" fill="currentColor" fillRule="evenodd"></path>
          <path d="M211.6,161h0c-6.2-7.1-9-18.4-9-33.2V43.4c0-4.9,4.1-11.3,12.1-11.3s12.1,6.5,12.1,11.3v84.4c0,8.8,1.3,14.4,3.4,17.3,2,2.7,5.7,4.4,11.8,4.4h33c2.3,0,4.9,1,6.9,2.7,2.1,1.8,3.7,4.6,3.7,8.2s-1.6,6.4-3.7,8.2c-2,1.8-4.6,2.7-6.9,2.7h-33c-13.5,0-23.9-3.2-30.4-10.4h0Z" fill="currentColor" fillRule="evenodd"></path>
          <path d="M450.8,176.7c-5.7,2.7-7.9,9.3-5.2,14.9h0s0,0,0,0c8.6,17.5,26,28.4,45.5,28.4,27.8,0,50.5-22.7,50.5-50.5v-48.9c0-28-22.7-50.5-50.5-50.5s-50.5,22.5-50.5,50.5,22.5,50.5,50.5,50.5,20-3.3,28.1-8.7v7.7c-.4,15.2-12.8,27.5-28.1,27.5s-20.5-6.1-25.3-15.9h0s0,0,0,0c-2.7-5.4-9.5-7.7-15-5ZM491.1,148.6c15.3,0,28.1-12.8,28.1-28.1s-12.8-28.1-28.1-28.1-28.1,12.6-28.1,28.1,12.6,28.1,28.1,28.1Z" fill="currentColor" fillRule="evenodd"></path>
          <path d="M379.7,70c27.8,0,50.5,22.5,50.5,50.5v39.2c0,6.3-5,11.3-11.3,11.3s-11.1-5-11.1-11.3v-39.2c0-15.5-12.6-28.1-28.1-28.1s-28.1,12.6-28.1,28.1v39.2c0,6.3-5,11.3-11.3,11.3s-11.1-5-11.1-11.3v-39.2c0-28,22.7-50.5,50.5-50.5Z" fill="currentColor" fillRule="evenodd"></path>
          <path d="M307.7,171.2c-6.3,0-11.3-5-11.3-11.3v-78.6c0-6.1,5-11.1,11.3-11.1s11.1,5,11.1,11.1v78.6c0,6.3-5,11.3-11.1,11.3ZM307.7,53.8c-2.9,0-5.9-1.1-7.9-3.2-2-2-3.4-4.9-3.4-7.9s1.4-5.9,3.4-7.9c2-2,4.9-3.4,7.9-3.4s5.9,1.4,7.9,3.4c2.1,2.1,3.2,5,3.2,7.9s-1.1,5.9-3.2,7.9c-2.1,2.1-5,3.2-7.9,3.2Z" fill="currentColor" fillRule="evenodd"></path>
          <path d="M551.9,105.1c0-24.4,5.7-42.7,17-54.9,11.3-12.2,27.7-18.3,49.1-18.3s37.7,6.1,49.1,18.3c11.3,12.2,17,30.5,17,54.9s-2.3,27.3-7,37.8c-4.6,10.5-11.2,18.5-19.7,24.1,3.4.4,6.8,1.5,10.3,3.3,3.5,1.7,6.1,3.6,7.6,5.7,1.8,2.4,2.8,5,2.8,7.5s-1.2,6-3.5,8.3c-2.2,2.4-5.1,3.6-8.5,3.6s-6-1.2-8.4-3.6c-3.6-3.5-6.8-6.2-9.7-7.9-2.9-1.7-6.7-3.1-11.5-4.2-4.8-1-11-1.6-18.6-1.6-21.3,0-37.7-6.1-49.1-18.4-11.3-12.3-17-30.5-17-54.6ZM576.9,105.1c0,34.2,13.7,51.3,41.1,51.3s41-17.1,41-51.3-3.4-30.2-10.2-38.7c-6.8-8.6-17.1-12.8-30.9-12.8-27.4,0-41.1,17.2-41.1,51.5Z" fill="currentColor"></path>
        </svg>
      </a>
      
      <div className={styles.rightSection}>
        <div className={styles.navGroup}>
          {/* Activity Dropdown */}
          <button className={styles.activityButton} title="Activity Streak & Number of Coins">
            <span className={styles.streakCounter}>
              <figure className={styles.progressWrapper}>
                <img src={coinProgressIcon} alt="Coins progress" className={styles.progressIcon} />
              </figure>
              <div className={styles.progressContent}>
                <span className={styles.progressText}>0/100</span>
                <span className={styles.chevronWrapper}>
                  <ChevronDown size={16} />
                </span>
              </div>
            </span>
          </button>

          {/* Language Selector */}
          <div className={styles.languageSelector}>
            <button 
              className={styles.languageButton}
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              title="3082 Known Words"
            >
              <span className={styles.flagWrapper}>
                <svg width="39" height="39" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
                  <path fill="#CF3535" d="M54,2.5v75C74.7,69.7,85.2,46.7,77.5,26C73.4,15.1,64.9,6.6,54,2.5z"></path>
                  <path fill="#01297B" d="M26,77.5v-75C5.3,10.3-5.2,33.3,2.5,54C6.6,64.9,15.1,73.4,26,77.5z"></path>
                  <path fill="#FFFFFF" d="M40,0c-4.8,0-9.5,0.9-14,2.5v75c9,3.4,19,3.4,28,0v-75C49.5,0.9,44.8,0,40,0z"></path>
                  <circle cx="40" cy="40" r="40" stroke="#777" strokeWidth="1" fill="none"></circle>
                </svg>
              </span>
              <span className={styles.languageText}>
                <span className={styles.knownWords}>3082</span>
                <ChevronDown size={18} strokeWidth={2.5} />
              </span>
            </button>
            
            {languageMenuOpen && (
              <div className={styles.languageMenu}>
                <ul className={styles.languageList}>
                  <li className={styles.languageItem}>
                    <a href="/learn/zh/web/library" className={styles.languageLink}>
                      <span className={styles.flagIcon}>
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
                          <circle fill="#d33131" cx="40" cy="40" r="40"></circle>
                          <path fill="#ffc200" d="M26.30631,548.82521L20.084,553.15508a0.5268,0.5268,0,0,1-.80513-0.585l2.19515-7.25578a0.5268,0.5268,0,0,0-.186-0.57234l-6.04075-4.57977a0.5268,0.5268,0,0,1,.30753-0.94649l7.579-.15445a0.5268,0.5268,0,0,0,.48686-0.35373l2.48893-7.16032a0.5268,0.5268,0,0,1,.9952,0l2.48893,7.16032a0.5268,0.5268,0,0,0,.48686.35373l7.579,0.15445a0.5268,0.5268,0,0,1,.30753.94649L31.92637,544.742a0.5268,0.5268,0,0,0-.186.57234l2.19515,7.25578a0.5268,0.5268,0,0,1-.80513.585l-6.22232-4.32987A0.5268,0.5268,0,0,0,26.30631,548.82521Z" transform="translate(0 -506)"></path>
                        </svg>
                      </span>
                      <span className={styles.languageName}>Chinese</span>
                      <span className={styles.languageCount}>(0)</span>
                    </a>
                  </li>
                  <li><hr className={styles.divider} /></li>
                  <li className={styles.languageItem}>
                    <button className={styles.addLanguageButton}>
                      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <line fill="none" stroke="#050d18" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="7.5" x2="7.5" y1="2" y2="13.5"></line>
                        <line fill="none" stroke="#050d18" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" y1="7.5" y2="7.5" x1="2" x2="13.5"></line>
                      </svg>
                      <span>Add a new language</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebHeader
