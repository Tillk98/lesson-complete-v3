import React from 'react'
import styles from './StatTile.module.css'
import lingqIcon from '../assets/lingq-icon.png'
import knownWordsIcon from '../assets/known-words-icon.png'
import hourglassIcon from '../assets/hourglass-icon.png'

interface StatTileProps {
  iconType: 'lingqs' | 'knownWords' | 'studyTime'
  value: number | string
  change: number
  changeType: 'increase' | 'decrease'
  label: string
}

const StatTile: React.FC<StatTileProps> = ({ iconType, value, change, changeType, label }) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'lingqs':
        return (
          <div className={styles.iconContainer}>
            <img src={lingqIcon} alt="LingQs" className={styles.iconImage} />
          </div>
        )
      case 'knownWords':
        return (
          <div className={styles.iconContainer}>
            <img src={knownWordsIcon} alt="Known Words" className={styles.iconImage} />
          </div>
        )
      case 'studyTime':
        return (
          <div className={styles.iconContainer}>
            <img src={hourglassIcon} alt="Study Time" className={styles.iconImage} />
          </div>
        )
    }
  }

  return (
    <div className={styles.container}>
      {renderIcon()}
      <div className={styles.content}>
        <div className={styles.valueRow}>
          <span className={styles.value}>{value}</span>
          <div className={styles.change} data-type={changeType}>
            {changeType === 'increase' ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 2L10 6H7V10H5V6H2L6 2Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 10L2 6H5V2H7V6H10L6 10Z"
                  fill="currentColor"
                />
              </svg>
            )}
            <span>{change}%</span>
          </div>
        </div>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  )
}

export default StatTile

