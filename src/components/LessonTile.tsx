import React from 'react'
import { Heart, Share2 } from 'lucide-react'
import styles from './LessonTile.module.css'
import lessonImage from '../assets/lesson-image.jpeg'

interface LessonTileProps {
  lesson: {
    title: string
    subtitle: string
    imageUrl: string
  }
}

const LessonTile: React.FC<LessonTileProps> = ({ lesson }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img 
          src={lessonImage} 
          alt={lesson.title} 
          className={styles.image}
        />
        <div className={styles.gradient} />
        <div className={styles.checkmark}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#42a564" stroke="white" strokeWidth="2" />
            <path
              d="M8 12l2 2 4-4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{lesson.title}</h2>
          <p className={styles.subtitle}>{lesson.subtitle}</p>
        </div>
        
        <div className={styles.actions}>
          <button className={styles.actionButton} aria-label="Like">
            <Heart size={24} />
          </button>
          <button className={styles.actionButton} aria-label="Share">
            <Share2 size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LessonTile

