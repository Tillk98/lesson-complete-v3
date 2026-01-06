import React from 'react'
import { ChevronRight } from 'lucide-react'
import styles from './NextLessonTile.module.css'
import lessonImage from '../assets/lesson-image.jpeg'

interface NextLessonTileProps {
  lesson: {
    title: string
    subtitle: string
    imageUrl: string
  }
  onClick?: () => void
}

const NextLessonTile: React.FC<NextLessonTileProps> = ({ lesson, onClick }) => {
  return (
    <button className={styles.container} onClick={onClick} aria-label={`Go to ${lesson.title}`}>
      <div className={styles.iconContainer}>
        <img 
          src={lessonImage} 
          alt={lesson.title} 
          className={styles.iconImage}
        />
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{lesson.title}</h3>
        <p className={styles.subtitle}>{lesson.subtitle}</p>
      </div>
      
      <ChevronRight className={styles.arrow} size={20} />
    </button>
  )
}

export default NextLessonTile

