"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import {
  Users,
  MapPin,
  Trophy,
  Heart,
  TrendingUp,
  Calendar,
  Award,
  Target,
  BarChart3,
} from "lucide-react"

const detailedStats = [
  { label: "Total Sekolah Terdaftar", value: 1247, icon: Trophy, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Total Votes Diberikan", value: 18943, icon: Heart, color: "text-red-600", bg: "bg-red-50" },
  { label: "Pengguna Aktif", value: 5672, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Kota Terdaftar", value: 34, icon: MapPin, color: "text-green-600", bg: "bg-green-50" },
  { label: "Votes Hari Ini", value: 234, icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
  { label: "Sekolah Baru Bulan Ini", value: 12, icon: Award, color: "text-cyan-600", bg: "bg-cyan-50" },
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
            <BarChart3 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Statistik Platform SchoolVote
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data lengkap tentang aktivitas voting dan partisipasi pengguna di seluruh Indonesia
          </p>
        </div>

        {/* Main Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {detailedStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="card-modern">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className={`w-12 h-12 ${stat.bg} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {animatedStats[index].toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Monthly Voting Trend */}
        <Card className="card-modern mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Tren Voting Bulanan 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4">
              {monthlyVotes.map((month, index) => (
                <div key={index} className="text-center">
                  <div className="bg-muted rounded-xl p-4 mb-3">
                    <div className="text-xl font-bold text-primary mb-1">
                      {animatedMonthly[index].toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">votes</div>
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2">{month.month}</div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
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
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Top 5 Daerah Berpartisipasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRegions.map((region, index) => (
                <div key={index} className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${region.color} rounded-full mr-3 flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{region.region}</div>
                        <div className="text-sm text-muted-foreground">{region.schools} sekolah</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">
                        {animatedRegions[index].toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">total votes</div>
                    </div>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
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
  )
}