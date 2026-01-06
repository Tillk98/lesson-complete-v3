import React from 'react'
import StatTile from './StatTile'
import ProgressBar from './ProgressBar'
import Chart from './Chart'
import NextLessonTile from './NextLessonTile'
import styles from './ChatMessage.module.css'
import lynxIcon from '../assets/lynx-icon.png'
import reviewIcon from '../assets/review-icon-blue.png'
import retakeLessonIcon from '../assets/retake-lesson.png'
import retakeLessonBlueIcon from '../assets/retake-lesson-blue.png'
import vocabReviewIcon from '../assets/vocab-review.png'

interface ChatMessageProps {
  type: 'feedback' | 'insight' | 'chart' | 'improvement' | 'recommendation'
  children: React.ReactNode
  showHeader?: boolean
  nextLesson?: {
    title: string
    subtitle: string
    imageUrl: string
  }
  onNextLessonClick?: () => void
  onReviewVocabClick?: () => void
  onReviewLessonClick?: () => void
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  type, 
  children, 
  showHeader = false,
  nextLesson,
  onNextLessonClick,
  onReviewVocabClick,
  onReviewLessonClick
}) => {
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
            <a href="#" className={styles.retakeLink} onClick={(e) => { e.preventDefault(); }}>
              <img src={retakeLessonBlueIcon} alt="Retake" className={styles.retakeIconImage} />
              <span>retake this lesson</span>
            </a>
          </>
        )}

        {type === 'recommendation' && (
          <>
            <p className={styles.text}>{children}</p>
            {nextLesson && (
              <NextLessonTile 
                lesson={nextLesson} 
                onClick={onNextLessonClick}
              />
            )}
            <div className={styles.secondaryActions}>
              <button className={styles.secondaryButton} onClick={onReviewVocabClick}>
                <img src={vocabReviewIcon} alt="Review Vocab" className={styles.secondaryIconImage} />
                <div className={styles.secondaryLabel}>Review Vocab</div>
              </button>
              <button className={styles.secondaryButton} onClick={onReviewLessonClick}>
                <img src={retakeLessonIcon} alt="Retake Lesson" className={styles.secondaryIconImage} />
                <div className={styles.secondaryLabel}>Review this Lesson</div>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChatMessage

