"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/ui/navigation"
import {
  Star,
  Users,
  MapPin,
  Plus,
  Minus,
  ShoppingCart,
  Trophy,
  Heart,
  Zap,
  CreditCard,
  TrendingUp,
  Award,
} from "lucide-react"

const schools = [
  {
    id: 1,
    name: "SMA Negeri 1 Jakarta",
    location: "Jakarta Pusat",
    votes: 2847,
    rating: 4.9,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=400",
    rank: 1,
    price: 5000,
  },
  {
    id: 2,
    name: "SMA Negeri 3 Bandung",
    location: "Bandung",
    votes: 2634,
    rating: 4.8,
    image: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400",
    rank: 2,
    price: 5000,
  },
  {
    id: 3,
    name: "SMA Negeri 5 Surabaya",
    location: "Surabaya",
    votes: 2521,
    rating: 4.7,
    image: "https://images.pexels.com/photos/159844/pexels-photo-159844.jpeg?auto=compress&cs=tinysrgb&w=400",
    rank: 3,
    price: 5000,
  },
  {
    id: 4,
    name: "SMA Negeri 2 Yogyakarta",
    location: "Yogyakarta",
    votes: 2398,
    rating: 4.6,
    image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=400",
    rank: 4,
    price: 5000,
  },
  {
    id: 5,
    name: "SMA Negeri 1 Medan",
    location: "Medan",
    votes: 2287,
    rating: 4.5,
    image: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400",
    rank: 5,
    price: 5000,
  },
]

const userStats = [
  { label: "Total Suara Anda", value: 24, icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-50" },
  { label: "Total Pengeluaran", value: "Rp 120.000", icon: CreditCard, color: "text-green-600", bg: "bg-green-50" },
  { label: "Sekolah Dipilih", value: 8, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Ranking Anda", value: "#47", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
]

export default function DashboardPage() {
  const [selectedVotes, setSelectedVotes] = useState<Record<number, number>>({})
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
  }

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

    console.log("Processing payment for votes:", selectedVotes)
    console.log("Total amount:", getTotalPrice())

    // Reset votes after successful payment
    setSelectedVotes({})
    setIsProcessingPayment(false)

    // Show success message
    alert("Pembayaran berhasil! Suara Anda telah dihitung.")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Selamat Datang, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Kelola voting Anda dan lihat statistik terbaru di dashboard ini
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {userStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="card-modern">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mr-4`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Schools List */}
          <div className="lg:col-span-2">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Daftar Sekolah
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {schools.map((school) => (
                  <div
                    key={school.id}
                    className="border border-border rounded-xl p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={school.image}
                            alt={school.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1">
                            #{school.rank}
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{school.name}</h3>
                          <div className="flex items-center text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{school.location}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center bg-yellow-50 rounded-full px-2 py-1">
                              <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" />
                              <span className="text-xs font-medium text-yellow-700">{school.rating}</span>
                            </div>
                            <div className="flex items-center bg-blue-50 rounded-full px-2 py-1">
                              <Users className="w-3 h-3 text-blue-500 mr-1" />
                              <span className="text-xs font-medium text-blue-700">{school.votes.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Harga per suara</p>
                          <p className="font-semibold text-foreground">Rp {school.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-muted rounded-xl p-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleVoteChange(school.id, -1)}
                            disabled={!selectedVotes[school.id]}
                            className="w-8 h-8 p-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {selectedVotes[school.id] || 0}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleVoteChange(school.id, 1)}
                            className="w-8 h-8 p-0 hover:bg-green-100 hover:text-green-600"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Voting Summary */}
          <div className="lg:col-span-1">
            <Card className="card-modern sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-primary" />
                  Ringkasan Vote
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getTotalVotes() === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium mb-2">Belum ada sekolah yang dipilih</p>
                    <p className="text-sm text-muted-foreground">Pilih sekolah dan tentukan jumlah suara</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(selectedVotes).map(([schoolId, votes]) => {
                      const school = schools.find((s) => s.id === Number.parseInt(schoolId))
                      if (!school) return null

                      return (
                        <div
                          key={schoolId}
                          className="flex justify-between items-center py-3 border-b border-border last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-foreground text-sm">{school.name}</p>
                            <p className="text-xs text-muted-foreground">{votes} suara</p>
                          </div>
                          <p className="font-semibold text-foreground">
                            Rp {(votes * school.price).toLocaleString()}
                          </p>
                        </div>
                      )
                    })}

                    <div className="border-t border-border pt-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-muted-foreground">Total Suara:</span>
                        <span className="font-bold text-foreground text-lg">{getTotalVotes()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-muted-foreground">Total Harga:</span>
                        <span className="font-bold text-primary text-xl">Rp {getTotalPrice().toLocaleString()}</span>
                      </div>

                      <Button
                        onClick={handlePaymentAndVote}
                        disabled={isProcessingPayment}
                        className="w-full btn-primary mt-4"
                      >
                        {isProcessingPayment ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Memproses Pembayaran...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Heart className="w-4 h-4" />
                            <span>Bayar & Vote</span>
                          </div>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center mt-3">
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