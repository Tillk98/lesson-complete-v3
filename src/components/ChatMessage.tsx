import React from 'react'
import StatTile from './StatTile'
import ProgressBar from './ProgressBar'
import ChartWeb from './ChartWeb'
import NextLessonTile from './NextLessonTile'
import { translateText, type Language } from '../utils/translations'
import styles from './ChatMessage.module.css'
import retakeLessonBlueIcon from '../assets/retake-lesson-blue.png'

interface ChatMessageProps {
  type: 'feedback' | 'insight' | 'chart' | 'improvement' | 'recommendation' | 'user'
  children: React.ReactNode
  messageId?: number
  referencedMessageId?: number
  referencedContent?: string
  language?: Language
  nextLesson?: {
    title: string
    subtitle: string
  }
  onNextLessonClick?: () => void
  onMessageClick?: (messageId: number, content: string) => void
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  type, 
  children, 
  messageId,
  referencedContent,
  language = 'en',
  nextLesson,
  onNextLessonClick,
  onMessageClick
}) => {
  const isUserMessage = type === 'user'
  
  const handleClick = () => {
    if (onMessageClick && messageId !== undefined && type !== 'user') {
      // Extract text content from children
      let content = ''
      if (typeof children === 'string') {
        content = children
      } else {
        const extractText = (node: React.ReactNode): string => {
          if (typeof node === 'string' || typeof node === 'number') {
            return String(node)
          }
          if (React.isValidElement(node) && node.props.children) {
            return React.Children.toArray(node.props.children)
              .map(extractText)
              .join(' ')
          }
          return ''
        }
        content = React.Children.toArray(children)
          .map(extractText)
          .join(' ')
      }
      // Limit preview length and clean up
      content = content.substring(0, 100).trim()
      if (content) {
        onMessageClick(messageId, content)
      }
    }
  }
  
  return (
    <div 
      className={`${styles.container} ${isUserMessage ? styles.userContainer : styles.lynxContainer} ${onMessageClick ? styles.clickable : ''}`}
      onClick={handleClick}
    >
      
      <div className={`${styles.message} ${type === 'user' ? styles.userMessage : styles.lynxMessage}`}>
        {type === 'user' && (
          <>
            {referencedContent && (
              <div className={styles.referenceIndicator}>
                <div className={styles.referenceLine} />
                <span className={styles.referencePreview}>{referencedContent}</span>
              </div>
            )}
            <p className={styles.text}>{children}</p>
          </>
        )}
        
        {type === 'feedback' && (
          <>
            <p className={styles.text}>{children}</p>
            <ProgressBar progress={5} level="B1" />
          </>
        )}
        
        {type === 'insight' && (
          <>
            <h3 className={styles.heading}>{translateText('YOUR TOP INSIGHT', language)}</h3>
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
            <h3 className={styles.heading}>{translateText('KNOWN WORDS – FIRST 30 DAYS', language)}</h3>
            <p className={styles.text}>{children}</p>
            <ChartWeb />
          </>
        )}
        
        {type === 'improvement' && (
          <>
            <h3 className={styles.heading}>{translateText('HMMM ... SOMETHING TO THINK ABOUT 🤔', language)}</h3>
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
              <span>{translateText('retake this lesson', language)}</span>
            </a>
          </>
        )}

        {type === 'recommendation' && (
          <>
            <h3 className={styles.heading}>{translateText('Keep your momentum going! 🚀', language)}</h3>
            <p className={styles.text}>{children}</p>
            {nextLesson && (
              <NextLessonTile 
                lesson={nextLesson} 
                onClick={onNextLessonClick}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ChatMessage

