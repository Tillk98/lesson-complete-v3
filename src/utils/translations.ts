// Translation utility for Lynx AI messages
import React from 'react'

export type Language = 'en' | 'fr'

const translations: Record<string, { en: string; fr: string }> = {
  // Typing indicator
  'Lynx is thinking...': {
    en: 'Lynx is thinking...',
    fr: 'Lynx réfléchit...',
  },
  
  // Feedback message (text only, without formatting)
  'You finished "Prendre un Café," your third lesson on LingQ – congrats! Most notably, you added 50 new known words. You\'re already 5% into B1 in French 💪': {
    en: 'You finished "Prendre un Café," your third lesson on LingQ – congrats! Most notably, you added 50 new known words. You\'re already 5% into B1 in French 💪',
    fr: 'Vous avez terminé "Prendre un Café", votre troisième leçon sur LingQ – félicitations ! Vous avez notamment ajouté 50 nouveaux mots connus. Vous êtes déjà à 5% du niveau B1 en français 💪',
  },
  
  // Insight message (text only)
  'Here are some of your most notable stats from this lesson. You are creating LingQs 2x faster than expanding your known vocabulary – a sign that you\'re actively engaging with challenging content!': {
    en: 'Here are some of your most notable stats from this lesson. You are creating LingQs 2x faster than expanding your known vocabulary – a sign that you\'re actively engaging with challenging content!',
    fr: 'Voici quelques-unes de vos statistiques les plus remarquables de cette leçon. Vous créez des LingQs 2 fois plus vite que vous n\'élargissez votre vocabulaire connu – un signe que vous vous engagez activement avec du contenu stimulant !',
  },
  
  // Chart message
  'Interestingly, you\'re outpacing the average learner 2 to 1 in known words for the first month ... that\'s something to be proud of. Have you learned some French before?': {
    en: 'Interestingly, you\'re outpacing the average learner 2 to 1 in known words for the first month ... that\'s something to be proud of. Have you learned some French before?',
    fr: 'Intéressant, vous dépassez l\'apprenant moyen de 2 à 1 en mots connus pour le premier mois... c\'est quelque chose dont être fier. Avez-vous déjà appris un peu de français ?',
  },
  
  // Improvement message
  'Although you\'re doing really well, it looks like you sort of zoomed through this lesson. It\'s quite lengthy at 20 pages, so maybe you\'d like to take some time to review what you\'ve learned? Worst case, you\'ll get some more known words out of it.': {
    en: 'Although you\'re doing really well, it looks like you sort of zoomed through this lesson. It\'s quite lengthy at 20 pages, so maybe you\'d like to take some time to review what you\'ve learned? Worst case, you\'ll get some more known words out of it.',
    fr: 'Bien que vous vous en sortiez très bien, il semble que vous ayez un peu survolé cette leçon. Elle est assez longue avec 20 pages, alors peut-être aimeriez-vous prendre le temps de réviser ce que vous avez appris ? Dans le pire des cas, vous obtiendrez quelques mots connus supplémentaires.',
  },
  
  // Recommendation message
  'Based on your progress, I\'d recommend continuing with the next lesson. You\'re doing great, and building on what you\'ve learned will help reinforce these concepts.': {
    en: 'Based on your progress, I\'d recommend continuing with the next lesson. You\'re doing great, and building on what you\'ve learned will help reinforce these concepts.',
    fr: 'Sur la base de vos progrès, je recommanderais de continuer avec la leçon suivante. Vous vous en sortez très bien, et construire sur ce que vous avez appris aidera à renforcer ces concepts.',
  },
  
  // Headings
  'YOUR TOP INSIGHT': {
    en: 'YOUR TOP INSIGHT',
    fr: 'VOTRE MEILLEURE PERCEPTION',
  },
  'KNOWN WORDS – FIRST 30 DAYS': {
    en: 'KNOWN WORDS – FIRST 30 DAYS',
    fr: 'MOTS CONNUS – 30 PREMIERS JOURS',
  },
  'HMMM ... SOMETHING TO THINK ABOUT 🤔': {
    en: 'HMMM ... SOMETHING TO THINK ABOUT 🤔',
    fr: 'HMMM ... QUELQUE CHOSE À RÉFLÉCHIR 🤔',
  },
  'Keep your momentum going! 🚀': {
    en: 'Keep your momentum going! 🚀',
    fr: 'Continuez votre élan ! 🚀',
  },
  
  // Button labels
  'Review Vocab': {
    en: 'Review Vocab',
    fr: 'Réviser le vocabulaire',
  },
  'Review this Lesson': {
    en: 'Review this Lesson',
    fr: 'Réviser cette leçon',
  },
  'retake this lesson': {
    en: 'retake this lesson',
    fr: 'refaire cette leçon',
  },
}

export const translateText = (text: string, language: Language): string => {
  // Check if we have a direct translation
  if (translations[text]) {
    return translations[text][language]
  }
  
  // Try to translate React elements by extracting text
  // For complex content, return original if no translation found
  return text
}

const extractTextFromNode = (node: React.ReactNode): string => {
  if (typeof node === 'string') {
    return node
  }
  if (typeof node === 'number') {
    return String(node)
  }
  if (React.isValidElement(node) && node.props.children) {
    return React.Children.toArray(node.props.children)
      .map(extractTextFromNode)
      .join(' ')
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join(' ')
  }
  return ''
}

export const translateReactNode = (node: React.ReactNode, language: Language): React.ReactNode => {
  if (typeof node === 'string') {
    return translateText(node, language)
  }
  
  if (typeof node === 'number') {
    return node
  }
  
  if (React.isValidElement(node)) {
    // For React fragments, extract text and translate if we have a full match
    if (node.type === React.Fragment) {
      const fullText = extractTextFromNode(node).trim()
      if (fullText && translations[fullText]) {
        // Return translated text, preserving any formatting if needed
        return translations[fullText][language]
      }
      // Otherwise, translate children recursively
      if (node.props.children) {
        const translatedChildren = React.Children.map(node.props.children, (child) =>
          translateReactNode(child, language)
        )
        return React.createElement(React.Fragment, {}, ...translatedChildren)
      }
      return node
    }
    
    // For other elements, translate children while preserving structure
    if (node.props.children) {
      const translatedChildren = React.Children.map(node.props.children, (child) =>
        translateReactNode(child, language)
      )
      return React.cloneElement(node, { ...node.props, children: translatedChildren })
    }
    return node
  }
  
  if (Array.isArray(node)) {
    return node.map((item) => translateReactNode(item, language))
  }
  
  return node
}

