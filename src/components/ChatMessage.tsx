import React from 'react'
import StatTile from './StatTile'
import ProgressBar from './ProgressBar'
import Chart from './Chart'
import styles from './ChatMessage.module.css'
import lynxIcon from '../assets/lynx-icon.png'
import reviewIcon from '../assets/review-icon-blue.png'

interface ChatMessageProps {
  type: 'feedback' | 'insight' | 'chart' | 'improvement'
  children: React.ReactNode
  showHeader?: boolean
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, children, showHeader = false }) => {
  return (
    <div className={styles.container}>
      {showHeader && (
        <div className={styles.lynxHeader}>
          <div className={styles.lynxIcon}>
            <img src={lynxIcon} alt="Lynx AI" className={styles.lynxImage} />
          </div>
          <span className={styles.lynxText}>Lynx AI</span>
        </div>
      )}
      
      <div className={styles.message}>
        {type === 'feedback' && (
          <>
            <p className={styles.text}>{children}</p>
            <ProgressBar progress={5} level="B1" />
          </>
        )}
        
        {type === 'insight' && (
          <>
            <h3 className={styles.heading}>YOUR TOP INSIGHT</h3>
            <p className={styles.text}>{children}</p>
            <div className={styles.statsGrid}>
              <StatTile
                iconType="lingqs"
                value={70}
                change={10}
                changeType="increase"
                label="LingQs Created"
              />
              <StatTile
                iconType="knownWords"
                value={1000}
                change={5}
                changeType="increase"
                label="Known Words"
              />
            </div>
          </>
        )}
        
        {type === 'chart' && (
          <>
            <h3 className={styles.heading}>KNOWN WORDS – FIRST 30 DAYS</h3>
            <p className={styles.text}>{children}</p>
            <Chart />
          </>
        )}
        
        {type === 'improvement' && (
          <>
            <h3 className={styles.heading}>HMMM ... SOMETHING TO THINK ABOUT 🤔</h3>
            <p className={styles.text}>{children}</p>
            <div className={styles.studyTimeCard}>
              <StatTile
                iconType="studyTime"
                value="10m 48s"
                change={50}
                changeType="decrease"
                label="Study Time"
              />
            </div>
            <button className={styles.reviewButton}>
              <img src={reviewIcon} alt="Review" className={styles.reviewIconImage} />
              <span>Review this Lesson</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ChatMessage

