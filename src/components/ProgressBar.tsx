import React from 'react'
import styles from './ProgressBar.module.css'
import levelBadgeB2 from '../assets/level-badge-b2.png'

interface ProgressBarProps {
  progress: number
  level: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, level }) => {
  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.levelBadge}>
        <img 
          src={levelBadgeB2} 
          alt={`Level ${level}`} 
          className={styles.levelImage}
        />
      </div>
    </div>
  )
}

export default ProgressBar

