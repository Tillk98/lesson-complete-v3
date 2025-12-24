import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import CelebrationAnimation from './CelebrationAnimation'
import LessonTile from './LessonTile'
import StatsSection from './StatsSection'
import TypingIndicator from './TypingIndicator'
import ChatMessage from './ChatMessage'
import BottomActions from './BottomActions'
import styles from './LessonCompleteScreen.module.css'

interface LessonData {
  title: string
  subtitle: string
  imageUrl: string
}

interface Stats {
  streak: number
  coins: number
  coinsTotal: number
}

interface LessonCompleteScreenProps {
  lesson?: LessonData
  stats?: Stats
}

const LessonCompleteScreen: React.FC<LessonCompleteScreenProps> = ({
  lesson = {
    title: 'Prendre un Café',
    subtitle: 'LingQ Mini Stories - French',
    imageUrl: 'http://localhost:3845/assets/db6eb497d12384bb1eabcc129317ead03e40571b.png',
  },
  stats = {
    streak: 5,
    coins: 15,
    coinsTotal: 100,
  },
}) => {
  const [animationPhase, setAnimationPhase] = useState<'celebration' | 'lesson' | 'stats' | 'typing' | 'chat'>('celebration')
  const [showCelebration, setShowCelebration] = useState(true)
  const [showTyping, setShowTyping] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; content: React.ReactNode; type: 'feedback' | 'insight' | 'chart' | 'improvement' }>>([])
  const [showHeaderBreadcrumb, setShowHeaderBreadcrumb] = useState(false)
  const [showBottomActions, setShowBottomActions] = useState(true)
  const [disableAutoScroll, setDisableAutoScroll] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const chatSectionRef = useRef<HTMLDivElement>(null)
  const topSectionRef = useRef<HTMLDivElement>(null)
  const messageRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const lastScrollY = useRef(0)
  const isAutoScrolling = useRef(false)

  useEffect(() => {
    // Phase 1: Celebration animation (1.5s)
    const timer1 = setTimeout(() => {
      setShowCelebration(false)
      setAnimationPhase('lesson')
    }, 1500)

    // Phase 2: Stats animation triggers
    const timer2 = setTimeout(() => {
      setAnimationPhase('stats')
    }, 2000)

    // Phase 3: Typing indicator (1s delay after stats)
    const timer3 = setTimeout(() => {
      setShowTyping(true)
      setAnimationPhase('typing')
    }, 3000)

    // Phase 4: First chat message appears
    const timer4 = setTimeout(() => {
      setShowTyping(false)
      setAnimationPhase('chat')
      setChatMessages([
        {
          id: 1,
          type: 'feedback',
          content: (
            <>
              You finished <em>"Prendre un Café,"</em> your third lesson on LingQ – congrats! Most notably, you added 50 new known words. You're already 5% into B1 in French 💪
            </>
          ),
        },
      ])
    }, 4000)

    // Phase 5: Second message (insight)
    const timer5 = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: 2,
          type: 'insight',
          content: (
            <>
              Here are some of your most notable stats from this lesson. You are creating LingQs{' '}
              <strong style={{ color: '#3160af' }}>2x faster</strong> than expanding your known vocabulary – a sign that you're actively engaging with challenging content!
            </>
          ),
        },
      ])
    }, 5500)

    // Phase 6: Chart message
    const timer6 = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: 3,
          type: 'chart',
          content: (
            <>
              Interestingly, you're outpacing the average learner 2 to 1 in known words for the first month ... that's something to be proud of. Have you learned some French before?
            </>
          ),
        },
      ])
    }, 7000)

    // Phase 7: Improvement message
    const timer7 = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: 4,
          type: 'improvement',
          content: (
            <>
              Although you're doing really well, it looks like you sort of zoomed through this lesson. It's quite lengthy at 20 pages, so maybe you'd like to take some time to review what you've learned? Worst case, you'll get some more known words out of it.
            </>
          ),
        },
      ])
    }, 8500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
      clearTimeout(timer7)
    }
  }, [])

  // Auto-scroll to center new messages when they appear
  useEffect(() => {
    if (chatMessages.length > 0 && !disableAutoScroll) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const lastMessageId = chatMessages[chatMessages.length - 1].id
        const lastMessageElement = messageRefs.current.get(lastMessageId)
        
        if (lastMessageElement) {
          // Mark that we're auto-scrolling
          isAutoScrolling.current = true
          
          // Center the message in the viewport, accounting for bottom actions
          const elementRect = lastMessageElement.getBoundingClientRect()
          const absoluteElementTop = elementRect.top + window.pageYOffset
          const bottomActionsHeight = 180 // Approximate height of bottom actions
          const availableHeight = window.innerHeight - bottomActionsHeight
          const middle = absoluteElementTop - (availableHeight / 2) + (elementRect.height / 2)
          
          window.scrollTo({
            top: Math.max(0, middle),
            behavior: 'smooth'
          })
          
          // Reset auto-scrolling flag after scroll animation completes
          setTimeout(() => {
            isAutoScrolling.current = false
          }, 500)
        }
      }, 200)
    }
  }, [chatMessages, disableAutoScroll])

  // Scroll detection for header breadcrumb and bottom actions
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Handle header breadcrumb
      if (topSectionRef.current) {
        const topSectionRect = topSectionRef.current.getBoundingClientRect()
        const headerHeight = 50 // Approximate header height
        // Show breadcrumb when top section bottom has scrolled past the header
        setShowHeaderBreadcrumb(topSectionRect.bottom <= headerHeight)
      }
      
      // Handle bottom actions visibility based on scroll direction
      // Keep buttons hidden at the top of the page
      if (currentScrollY <= 100) {
        setShowBottomActions(false)
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - hide buttons
        setShowBottomActions(false)
        // If user scrolls up while auto-scrolling, disable auto-scroll
        if (isAutoScrolling.current) {
          setDisableAutoScroll(true)
        }
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down - show buttons
        setShowBottomActions(true)
      }
      
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.container}>
      <Header showBreadcrumb={showHeaderBreadcrumb} lesson={lesson} stats={stats} />
      
      {showCelebration && <CelebrationAnimation />}
      
      <div className={styles.topSection} ref={topSectionRef}>
        <div className={`${styles.lessonSection} ${animationPhase === 'lesson' || animationPhase === 'stats' || animationPhase === 'typing' || animationPhase === 'chat' ? styles.fadeIn : ''}`}>
          <LessonTile lesson={lesson} />
        </div>
        
        <div className={`${styles.statsSection} ${animationPhase === 'stats' || animationPhase === 'typing' || animationPhase === 'chat' ? styles.fadeIn : ''}`}>
          <StatsSection stats={stats} />
        </div>
      </div>
      
      <div className={styles.content} ref={chatSectionRef}>
        <div className={styles.chatSection}>
          {showTyping && <TypingIndicator />}
          
          {chatMessages.map((message, index) => (
            <div
              key={message.id}
              ref={(el) => {
                if (el) {
                  messageRefs.current.set(message.id, el)
                } else {
                  messageRefs.current.delete(message.id)
                }
              }}
            >
              <ChatMessage type={message.type} showHeader={index === 0}>
                {message.content}
              </ChatMessage>
            </div>
          ))}
          
          {/* Scroll anchor at the bottom */}
          <div ref={chatEndRef} />
        </div>
      </div>
      
      <BottomActions visible={showBottomActions} onScrollToTop={() => setDisableAutoScroll(true)} />
    </div>
  )
}

export default LessonCompleteScreen

