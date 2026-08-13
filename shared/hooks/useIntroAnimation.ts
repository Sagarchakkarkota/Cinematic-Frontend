'use client'

import { useState, useEffect } from 'react'

const INTRO_STORAGE_KEY = 'utsavam-intro-played'

export function useIntroAnimation() {
  const [showIntro, setShowIntro] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Check if intro has been played in this session
    const hasPlayed = sessionStorage.getItem(INTRO_STORAGE_KEY) === 'true'
    
    if (!hasPlayed) {
      setShowIntro(true)
    } else {
      setIsCompleted(true)
    }
  }, [])

  const completeIntro = () => {
    setShowIntro(false)
    setIsCompleted(true)
    sessionStorage.setItem(INTRO_STORAGE_KEY, 'true')
  }

  return {
    showIntro,
    isCompleted,
    completeIntro,
  }
}
