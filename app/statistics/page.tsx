"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  MapPin,
  Trophy,
  Heart,
  Home,
  HelpCircle,
  User,
  Moon,
  Sun,
  BarChart3,
  Settings,
  LogIn,
  TrendingUp,
  Calendar,
  Award,
  Target,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const detailedStats = [
  { label: "Total Sekolah Terdaftar", value: 1247, color: "bg-purple-500", icon: Trophy },
  { label: "Total Votes Diberikan", value: 18943, color: "bg-blue-500", icon: Heart },
  { label: "Pengguna Aktif", value: 5672, color: "bg-green-500", icon: Users },
  { label: "Kota Terdaftar", value: 34, color: "bg-orange-500", icon: MapPin },
  { label: "Votes Hari Ini", value: 234, color: "bg-pink-500", icon: Calendar },
  { label: "Sekolah Baru Bulan Ini", value: 12, color: "bg-cyan-500", icon: Award },
]

const monthlyVotes = [
  { month: "Jan", votes: 1200 },
  { month: "Feb", votes: 1450 },
  { month: "Mar", votes: 1800 },
  { month: "Apr", votes: 2100 },
  { month: "Mei", votes: 2400 },
  { month: "Jun", votes: 2847 },
]

const topRegions = [
  { region: "Jakarta", schools: 156, votes: 4521, color: "bg-purple-500" },
  { region: "Jawa Barat", schools: 134, votes: 3987, color: "bg-blue-500" },
  { region: "Jawa Timur", schools: 128, votes: 3654, color: "bg-green-500" },
  { region: "Jawa Tengah", schools: 112, votes: 3234, color: "bg-orange-500" },
  { region: "Sumatera Utara", schools: 89, votes: 2876, color: "bg-pink-500" },
]

export default function StatisticsPage() {
  const [showPersonalMenu, setShowPersonalMenu] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(detailedStats.map(() => 0))
  const [animatedMonthly, setAnimatedMonthly] = useState(monthlyVotes.map(() => 0))
  const [animatedRegions, setAnimatedRegions] = useState(topRegions.map(() => 0))

  useEffect(() => {
    // Animate main statistics
    detailedStats.forEach((stat, index) => {
      let current = 0
      const increment = stat.value / 60
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setAnimatedStats((prev) => {
          const newStats = [...prev]
          newStats[index] = Math.floor(current)
          return newStats
        })
      }, 25)
    })

    // Animate monthly votes
    setTimeout(() => {
      monthlyVotes.forEach((month, index) => {
        let current = 0
        const increment = month.votes / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= month.votes) {
            current = month.votes
            clearInterval(timer)
          }
          setAnimatedMonthly((prev) => {
            const newStats = [...prev]
            newStats[index] = Math.floor(current)
            return newStats
          })
        }, 30)
      })
    }, 500)

    // Animate regional data
    setTimeout(() => {
      topRegions.forEach((region, index) => {
        let current = 0
        const increment = region.votes / 40
        const timer = setInterval(() => {
          current += increment
          if (current >= region.votes) {
            current = region.votes
            clearInterval(timer)
          }
          setAnimatedRegions((prev) => {
            const newStats = [...prev]
            newStats[index] = Math.floor(current)
            return newStats
          })
        }, 35)
      })
    }, 1000)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

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
                className="p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-lg transition-colors bg-purple-100 dark:bg-gray-700"
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

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">
              📊 Statistik Platform SchoolVote
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Data lengkap tentang aktivitas voting dan partisipasi pengguna
            </p>
          </div>

          {/* Main Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {detailedStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 shadow-lg hover-lift"
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div
                        className={`w-10 h-10 ${stat.color} rounded-full mx-auto mb-3 flex items-center justify-center`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                        {animatedStats[index].toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 leading-tight">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Monthly Voting Trend */}
          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 shadow-lg mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Tren Voting Bulanan 2025
              </h3>
              <div className="grid grid-cols-6 gap-4">
                {monthlyVotes.map((month, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-2">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {animatedMonthly[index].toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">votes</div>
                    </div>
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{month.month}</div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${(animatedMonthly[index] / Math.max(...monthlyVotes.map((m) => m.votes))) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Regions */}
          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Top 5 Daerah Berpartisipasi
              </h3>
              <div className="space-y-4">
                {topRegions.map((region, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 ${region.color} rounded-full mr-3 flex items-center justify-center`}>
                          <span className="text-white font-bold text-xs">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 dark:text-white text-sm">{region.region}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">{region.schools} sekolah</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800 dark:text-white">
                          {animatedRegions[index].toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">total votes</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`${region.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: `${(animatedRegions[index] / Math.max(...topRegions.map((r) => r.votes))) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
