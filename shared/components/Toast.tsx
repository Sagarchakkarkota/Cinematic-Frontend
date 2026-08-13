'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  isOpen: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, type = 'info', isOpen, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  const colors = {
    success: 'bg-secondary/20 text-secondary border-secondary/50',
    error: 'bg-red-500/20 text-red-400 border-red-500/50',
    info: 'bg-primary/20 text-foreground border-primary/50',
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className="fixed top-24 right-4 z-50 max-w-md"
        >
          <div
            className={`${colors[type]} border rounded-lg px-4 py-3 shadow-lg backdrop-blur-sm flex items-center justify-between gap-4`}
          >
            <p className="text-sm font-medium">{message}</p>
            <button
              onClick={onClose}
              className="text-current opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
