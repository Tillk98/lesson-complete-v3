import React from 'react'
import styles from './StatsSection.module.css'
import flameIcon from '../assets/flame-icon.png'
import coinIcon from '../assets/coin-icon.png'

interface StatsSectionProps {
  stats: {
    streak: number
    coins: number
    coinsTotal: number
  }
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <div className={styles.container}>
      <div className={styles.statsContent}>
        <div className={styles.statItem}>
          <div className={styles.flameIcon}>
            <img src={flameIcon} alt="Streak" className={styles.flameImage} />
          </div>
          <div className={styles.statValue}>
            <span className={styles.number}>{stats.streak}</span>
            <span className={styles.label}>Days</span>
          </div>
        </div>
        
        <div className={styles.statItem}>
          <div className={styles.coinIcon}>
            <img src={coinIcon} alt="Coins" className={styles.coinImage} />
          </div>
          <div className={styles.statValue}>
            <span className={styles.number}>{stats.coins}</span>
            <span className={styles.label}>/100 Coins</span>
          </div>
        </div>
      </div>
      
      <button className={styles.chevron} aria-label="View more stats">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 18l6-6-6-6"
            stroke="#6d7680"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default StatsSection

