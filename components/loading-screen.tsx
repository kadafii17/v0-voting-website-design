"use client"

import { useState, useEffect } from "react"
import { Trophy } from "lucide-react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true)
      setTimeout(() => {
        onLoadingComplete()
      }, 800) // Increased delay to allow fly up animation
    }, 2000)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center relative z-10">
        <div
          className={`relative transition-all duration-800 ${
            isComplete
              ? "transform -translate-y-96 scale-75 opacity-0"
              : "transform translate-y-0 scale-100 opacity-100"
          }`}
          style={{
            animation: isComplete ? "flyUp 0.8s ease-in forwards" : "bounce 2s infinite",
          }}
        >
          <div className="relative">
            {/* Main Trophy */}
            <Trophy className="w-32 h-32 text-yellow-500 mx-auto" />

            {/* Glowing effect */}
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          </div>

          {/* Trophy base glow */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-30 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
