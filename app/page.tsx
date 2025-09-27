"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Users,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Heart,
  Home,
  HelpCircle,
  LogIn,
  User,
  Moon,
  Sun,
  BarChart3,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { Sparkles } from "lucide-react"
import LoadingScreen from "@/components/loading-screen"

const topSchools = [
  {
    id: 1,
    name: "SMA Negeri 1 Jakarta",
    location: "Jakarta Pusat",
    votes: 2847,
    rating: 4.9,
    image: "/modern-school-building-jakarta.jpg",
    rank: 1,
    color: "bg-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    id: 2,
    name: "SMA Negeri 3 Bandung",
    location: "Bandung",
    votes: 2634,
    rating: 4.8,
    image: "/prestigious-school-bandung.jpg",
    rank: 2,
    color: "bg-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    name: "SMA Negeri 5 Surabaya",
    location: "Surabaya",
    votes: 2521,
    rating: 4.7,
    image: "/top-school-surabaya.jpg",
    rank: 3,
    color: "bg-green-500",
    bgColor: "bg-green-100",
  },
]

const otherSchools = [
  {
    id: 4,
    name: "SMA Negeri 2 Yogyakarta",
    location: "Yogyakarta",
    votes: 2398,
    rating: 4.6,
    color: "bg-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    id: 5,
    name: "SMA Negeri 1 Medan",
    location: "Medan",
    votes: 2287,
    rating: 4.5,
    color: "bg-pink-500",
    bgColor: "bg-pink-100",
  },
  {
    id: 6,
    name: "SMA Negeri 4 Semarang",
    location: "Semarang",
    votes: 2156,
    rating: 4.4,
    color: "bg-cyan-500",
    bgColor: "bg-cyan-100",
  },
  {
    id: 7,
    name: "SMA Negeri 3 Malang",
    location: "Malang",
    votes: 2043,
    rating: 4.3,
    color: "bg-red-500",
    bgColor: "bg-red-100",
  },
  {
    id: 8,
    name: "SMA Negeri 2 Denpasar",
    location: "Denpasar",
    votes: 1987,
    rating: 4.2,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-100",
  },
]

const top5Schools = [
  { name: "SMA Negeri 1 Jakarta", votes: 2847, color: "bg-purple-500" },
  { name: "SMA Negeri 3 Bandung", votes: 2634, color: "bg-blue-500" },
  { name: "SMA Negeri 5 Surabaya", votes: 2521, color: "bg-green-500" },
  { name: "SMA Negeri 2 Yogyakarta", votes: 2398, color: "bg-orange-500" },
  { name: "SMA Negeri 1 Medan", votes: 2287, color: "bg-pink-500" },
]

const statisticsData = [
  { label: "Total Sekolah", value: 1247, color: "bg-purple-500" },
  { label: "Total Votes", value: 18943, color: "bg-blue-500" },
  { label: "Pengguna Aktif", value: 5672, color: "bg-green-500" },
  { label: "Kota Terdaftar", value: 34, color: "bg-orange-500" },
]

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showPersonalMenu, setShowPersonalMenu] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showInlineStats, setShowInlineStats] = useState(false)
  const [animatedTop5Stats, setAnimatedTop5Stats] = useState(top5Schools.map(() => 0))
  const carouselRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % topSchools.length
    setCurrentSlide(newSlide)
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: newSlide * slideWidth,
        behavior: "smooth",
      })
    }
  }

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + topSchools.length) % topSchools.length
    setCurrentSlide(newSlide)
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth
      carouselRef.current.scrollTo({
        left: newSlide * slideWidth,
        behavior: "smooth",
      })
    }
  }

  const animateInlineStatistics = () => {
    setShowInlineStats(true)
    top5Schools.forEach((school, index) => {
      let current = 0
      const increment = school.votes / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= school.votes) {
          current = school.votes
          clearInterval(timer)
        }
        setAnimatedTop5Stats((prev) => {
          const newStats = [...prev]
          newStats[index] = Math.floor(current)
          return newStats
        })
      }, 30)
    })
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}>
      <header className="glass-effect sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-4">
              <Link href="/" className="p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Home className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </Link>
              <Link
                href="/how-to-use"
                className="p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </Link>
              <Link
                href="/statistics"
                className="p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </Link>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowPersonalMenu(!showPersonalMenu)}
                className="p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </button>

              {showPersonalMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                  <Link
                    href="/login"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login / Daftar
                  </Link>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    {isDarkMode ? "Mode Terang" : "Mode Gelap"}
                  </button>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Pengaturan
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-bounce-in">
            <div className="flex justify-center mb-4">
              <div className="relative" id="dashboard-title-trophy">
                <Trophy className="w-12 h-12 text-yellow-500 animate-float" />
                <Sparkles className="w-4 h-4 text-pink-500 absolute -top-1 -right-1 animate-wiggle" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4 text-balance">
              Pilih Sekolah Terbaik di Indonesia
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto text-pretty animate-slide-up">
              Berpartisipasilah dalam pemilihan sekolah terbaik dan bantu siswa lain menemukan institusi pendidikan yang
              tepat untuk masa depan mereka.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up">
              <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white cartoon-button px-6 py-2">
                <Heart className="w-4 h-4 mr-2" />
                Mulai Voting
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={animateInlineStatistics}
                className="border-2 border-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900 transition-all duration-300 hover:scale-105 px-6 py-2 bg-white dark:bg-gray-800 dark:text-white"
              >
                Lihat Statistik
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 animate-slide-up">
            <h3 className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400 mb-3">
              🏆 Top 3 Sekolah Terbaik
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Sekolah-sekolah terbaik pilihan masyarakat</p>
          </div>

          <div className="relative">
            <Button
              onClick={prevSlide}
              className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 shadow-lg cartoon-button"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              onClick={nextSlide}
              className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 shadow-lg cartoon-button"
              size="sm"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            <div
              ref={carouselRef}
              className="carousel-container flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 scrollbar-hide"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {topSchools.map((school, index) => (
                <Card
                  key={school.id}
                  className={`flex-none w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] mx-auto snap-center overflow-hidden hover-lift animate-bounce-in ${school.bgColor} border-3 border-white dark:border-gray-600 shadow-xl`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      <div className="relative w-full h-40 sm:h-44">
                        <img
                          src={school.image || "/placeholder.svg"}
                          alt={school.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge
                          className={`absolute top-2 left-2 ${school.color} text-white border-0 text-xs px-2 py-1 animate-wiggle`}
                        >
                          #{school.rank}
                        </Badge>
                        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 animate-float">
                          <Trophy className="w-3 h-3 text-yellow-500" />
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 bg-white dark:bg-gray-800">
                        <h4 className="text-sm sm:text-base font-bold text-gray-800 dark:text-white mb-2">
                          {school.name}
                        </h4>
                        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                          <MapPin className="w-3 h-3 mr-1 text-purple-500" />
                          <span className="text-xs sm:text-sm">{school.location}</span>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-1">
                            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900 rounded-full px-2 py-1">
                              <Star className="w-3 h-3 text-yellow-500 mr-1" />
                              <span className="font-bold text-xs text-yellow-700 dark:text-yellow-300">
                                {school.rating}
                              </span>
                            </div>
                            <div className="flex items-center bg-blue-100 dark:bg-blue-900 rounded-full px-2 py-1">
                              <Users className="w-3 h-3 text-blue-500 mr-1" />
                              <span className="font-bold text-xs text-blue-700 dark:text-blue-300">
                                {school.votes.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className={`w-full ${school.color} hover:scale-105 text-white cartoon-button text-xs py-2`}
                        >
                          <Heart className="w-3 h-3 mr-1" />
                          Vote Sekarang
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-4 space-x-1">
              {topSchools.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-purple-500 scale-125" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {showInlineStats && (
            <div className="mt-8 animate-slide-up">
              <div className="text-center mb-4">
                <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400">📊 Top 5 Statistik Voting</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
                {top5Schools.map((school, index) => (
                  <Card
                    key={index}
                    className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 shadow-lg hover-lift"
                  >
                    <CardContent className="p-3">
                      <div className="text-center">
                        <div
                          className={`w-8 h-8 ${school.color} rounded-full mx-auto mb-2 flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-xs">#{index + 1}</span>
                        </div>
                        <h5 className="text-xs font-bold text-gray-800 dark:text-white mb-2 leading-tight">
                          {school.name}
                        </h5>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                          <div className="text-lg font-bold text-gray-800 dark:text-white">
                            {animatedTop5Stats[index].toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">votes</div>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                          <div
                            className={`${school.color} h-1 rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${(animatedTop5Stats[index] / school.votes) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400 mb-6">
              🎓 Sekolah Lainnya
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {otherSchools.map((school, index) => (
                <Card
                  key={school.id}
                  className={`hover-lift animate-bounce-in ${school.bgColor} border-2 border-white dark:border-gray-600 shadow-lg aspect-square`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-1 sm:p-2 bg-white dark:bg-gray-800 rounded-lg m-1 sm:m-2 h-[calc(100%-8px)] sm:h-[calc(100%-16px)] flex flex-col justify-center items-center text-center">
                    <div className="flex-1 flex flex-col justify-center items-center space-y-2 sm:space-y-3">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white leading-tight line-clamp-2 px-1">
                        {school.name}
                      </h4>
                      <div className="flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full px-2 py-1">
                        <Users className="w-3 h-3 text-blue-500 mr-1" />
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
                          {school.votes.toLocaleString()}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className={`w-full max-w-[80px] sm:max-w-none ${school.color} hover:scale-105 text-white cartoon-button text-xs py-1 px-2`}
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        Vote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-purple-600 dark:bg-purple-800 text-white py-12 mt-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-pink-500 rounded-xl animate-wiggle"></div>
              <h3 className="text-xl font-bold text-white">SchoolVote</h3>
            </div>
            <p className="text-sm text-white/80 mb-6 max-w-2xl mx-auto">
              Platform voting sekolah terbaik di Indonesia dengan teknologi modern dan antarmuka yang menyenangkan
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a
                href="#"
                className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105 text-xs"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105 text-xs"
              >
                Syarat & Ketentuan
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105 text-xs"
              >
                Bantuan
              </a>
            </div>
            <p className="text-white/60 text-xs">© 2025 SchoolVote. Semua hak dilindungi dengan ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
