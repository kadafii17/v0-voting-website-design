"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  Users,
  MapPin,
  LogOut,
  CreditCard,
  Plus,
  Minus,
  ShoppingCart,
  Settings,
  Trophy,
  Sparkles,
  Heart,
  Zap,
} from "lucide-react"
import Link from "next/link"

const schools = [
  {
    id: 1,
    name: "SMA Negeri 1 Jakarta",
    location: "Jakarta Pusat",
    votes: 2847,
    rating: 4.9,
    image: "/placeholder.svg?key=ocoha",
    rank: 1,
    price: 5000,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    name: "SMA Negeri 3 Bandung",
    location: "Bandung",
    votes: 2634,
    rating: 4.8,
    image: "/placeholder.svg?key=hbkv2",
    rank: 2,
    price: 5000,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "SMA Negeri 5 Surabaya",
    location: "Surabaya",
    votes: 2521,
    rating: 4.7,
    image: "/placeholder.svg?key=ry3ut",
    rank: 3,
    price: 5000,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "SMA Negeri 2 Yogyakarta",
    location: "Yogyakarta",
    votes: 2398,
    rating: 4.6,
    image: "/placeholder.svg?key=ry3ut",
    rank: 4,
    price: 5000,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    name: "SMA Negeri 1 Medan",
    location: "Medan",
    votes: 2287,
    rating: 4.5,
    image: "/placeholder.svg?key=ry3ut",
    rank: 5,
    price: 5000,
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 6,
    name: "SMA Negeri 4 Semarang",
    location: "Semarang",
    votes: 2156,
    rating: 4.4,
    image: "/placeholder.svg?key=ry3ut",
    rank: 6,
    price: 5000,
    color: "from-pink-500 to-rose-500",
  },
]

export default function DashboardPage() {
  const [selectedVotes, setSelectedVotes] = useState<Record<number, number>>({})
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [showTrophyAnimation, setShowTrophyAnimation] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTrophyAnimation(false)
    }, 2500) // Extended duration to allow trophy to settle

    return () => clearTimeout(timer)
  }, [])

  const handleVoteChange = (schoolId: number, change: number) => {
    setSelectedVotes((prev) => {
      const currentVotes = prev[schoolId] || 0
      const newVotes = Math.max(0, currentVotes + change)

      if (newVotes === 0) {
        const { [schoolId]: removed, ...rest } = prev
        return rest
      }

      return { ...prev, [schoolId]: newVotes }
    })
  }

  const getTotalVotes = () => {
    return Object.values(selectedVotes).reduce((sum, votes) => sum + votes, 0)
  }

  const getTotalPrice = () => {
    return getTotalVotes() * 5000
  }

  const handlePaymentAndVote = async () => {
    if (getTotalVotes() === 0) return

    setIsProcessingPayment(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Here you would integrate with payment gateway
    console.log("Processing payment for votes:", selectedVotes)
    console.log("Total amount:", getTotalPrice())

    // Reset votes after successful payment
    setSelectedVotes({})
    setIsProcessingPayment(false)

    // Show success message or redirect
    alert("Pembayaran berhasil! Suara Anda telah dihitung.")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {showTrophyAnimation && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Trophy
              className="w-16 h-16 text-yellow-500"
              style={{
                animation: "fallDownFromTop 2.5s ease-out forwards",
              }}
            />
          </div>
        </div>
      )}

      <header className="bg-white dark:bg-gray-900 sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg"></div>
                <h1 className="text-2xl font-bold text-purple-600 dark:text-purple-400">SchoolVote</h1>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-primary font-semibold flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Dashboard</span>
                </a>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105"
                >
                  Riwayat Vote
                </a>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105"
                >
                  Leaderboard
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-foreground font-semibold">John Doe</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-4 animate-slide-up">
            Pilih Sekolah Terbaik Indonesia
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Yukk Vote
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover-lift animate-slide-up bg-gradient-to-r from-yellow-500 to-orange-500 p-1 rounded-xl shadow-xl">
            <CardContent className="p-6 bg-card rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">Total Suara Anda</p>
                  <p className="text-3xl font-bold text-foreground">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            className="hover-lift animate-slide-up bg-gradient-to-r from-green-500 to-emerald-500 p-1 rounded-xl shadow-xl"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6 bg-card rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">Total Pengeluaran</p>
                  <p className="text-3xl font-bold text-foreground">Rp 120.000</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            className="hover-lift animate-slide-up bg-gradient-to-r from-blue-500 to-cyan-500 p-1 rounded-xl shadow-xl"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-6 bg-card rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">Sekolah Dipilih</p>
                  <p className="text-3xl font-bold text-foreground">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="glass-effect shadow-2xl border-0 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl font-bold gradient-text flex items-center">
                  <Zap className="w-6 h-6 mr-2" />
                  Daftar Sekolah
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-6 p-6">
                  {schools.map((school, index) => (
                    <div
                      key={school.id}
                      className={`bg-gradient-to-r ${school.color} p-1 rounded-xl hover-lift animate-bounce-in shadow-lg`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="bg-card rounded-lg p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={school.image || "/placeholder.svg"}
                                alt={school.name}
                                className="w-20 h-20 rounded-xl object-cover"
                              />
                              <Badge
                                className={`absolute -top-2 -right-2 bg-gradient-to-r ${school.color} text-white border-0 text-sm px-3 py-1 animate-pulse-glow`}
                              >
                                #{school.rank}
                              </Badge>
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground text-xl mb-2">{school.name}</h3>
                              <div className="flex items-center text-foreground/70 mb-2">
                                <MapPin className="w-4 h-4 mr-2 text-primary" />
                                <span>{school.location}</span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1">
                                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                  <span className="font-bold text-yellow-700">{school.rating}</span>
                                </div>
                                <div className="flex items-center bg-blue-100 rounded-full px-3 py-1">
                                  <Users className="w-4 h-4 text-blue-500 mr-1" />
                                  <span className="font-bold text-blue-700">{school.votes.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm text-foreground/70 font-medium">Harga per suara</p>
                              <p className="font-bold text-foreground text-lg">Rp {school.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center space-x-2 bg-muted rounded-xl p-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleVoteChange(school.id, -1)}
                                disabled={!selectedVotes[school.id]}
                                className="w-10 h-10 p-0 hover:bg-red-100 hover:text-red-600 transition-all duration-300"
                              >
                                <Minus className="w-5 h-5" />
                              </Button>
                              <span className="w-12 text-center font-bold text-lg">
                                {selectedVotes[school.id] || 0}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleVoteChange(school.id, 1)}
                                className="w-10 h-10 p-0 hover:bg-green-100 hover:text-green-600 transition-all duration-300"
                              >
                                <Plus className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 glass-effect shadow-2xl border-0 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-xl font-bold gradient-text flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Ringkasan Vote
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getTotalVotes() === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-foreground/70 text-lg font-medium mb-2">Belum ada sekolah yang dipilih</p>
                    <p className="text-foreground/50">Pilih sekolah dan tentukan jumlah suara ✨</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(selectedVotes).map(([schoolId, votes]) => {
                      const school = schools.find((s) => s.id === Number.parseInt(schoolId))
                      if (!school) return null

                      return (
                        <div
                          key={schoolId}
                          className="flex justify-between items-center py-3 border-b border-border/50 animate-slide-up"
                        >
                          <div>
                            <p className="font-semibold text-foreground">{school.name}</p>
                            <p className="text-sm text-foreground/70">{votes} suara</p>
                          </div>
                          <p className="font-bold text-foreground text-lg">
                            Rp {(votes * school.price).toLocaleString()}
                          </p>
                        </div>
                      )
                    })}

                    <div className="border-t border-border pt-6 mt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground/80 text-lg">Total Suara:</span>
                        <span className="font-bold text-foreground text-xl">{getTotalVotes()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground/80 text-lg">Total Harga:</span>
                        <span className="font-bold gradient-text text-2xl">Rp {getTotalPrice().toLocaleString()}</span>
                      </div>

                      <Button
                        onClick={handlePaymentAndVote}
                        disabled={isProcessingPayment}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 text-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-pulse-glow mt-6"
                      >
                        {isProcessingPayment ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Memproses Pembayaran...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Heart className="w-5 h-5" />
                            <span>Bayar & Vote</span>
                          </div>
                        )}
                      </Button>

                      <p className="text-sm text-foreground/60 text-center mt-4">
                        🔒 Pembayaran aman dengan enkripsi SSL
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
