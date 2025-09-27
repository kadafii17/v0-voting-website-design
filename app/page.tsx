"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/ui/navigation"
import { Star, Users, MapPin, Trophy, Heart, ArrowRight, CircleCheck as CheckCircle, TrendingUp, Award, Target, Sparkles } from "lucide-react"

const topSchools = [
  {
    id: 1,
    name: "SMA Negeri 1 Jakarta",
    location: "Jakarta Pusat",
    votes: 2847,
    rating: 4.9,
    image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800",
    rank: 1,
    description: "Sekolah unggulan dengan fasilitas modern dan prestasi akademik terbaik",
  },
  {
    id: 2,
    name: "SMA Negeri 3 Bandung",
    location: "Bandung",
    votes: 2634,
    rating: 4.8,
    image: "https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800",
    rank: 2,
    description: "Sekolah dengan program unggulan sains dan teknologi",
  },
  {
    id: 3,
    name: "SMA Negeri 5 Surabaya",
    location: "Surabaya",
    votes: 2521,
    rating: 4.7,
    image: "https://images.pexels.com/photos/159844/pexels-photo-159844.jpeg?auto=compress&cs=tinysrgb&w=800",
    rank: 3,
    description: "Sekolah dengan tradisi keunggulan dalam bidang olahraga dan seni",
  },
]

const features = [
  {
    icon: Trophy,
    title: "Voting Transparan",
    description: "Sistem voting yang transparan dan dapat diverifikasi oleh semua pengguna",
  },
  {
    icon: Users,
    title: "Komunitas Aktif",
    description: "Bergabung dengan ribuan siswa dan orang tua dalam memilih sekolah terbaik",
  },
  {
    icon: Award,
    title: "Data Akurat",
    description: "Informasi sekolah yang akurat dan selalu diperbarui secara berkala",
  },
  {
    icon: Target,
    title: "Hasil Real-time",
    description: "Lihat hasil voting secara real-time dengan visualisasi yang menarik",
  },
]

const stats = [
  { label: "Total Sekolah", value: "1,247", icon: Trophy },
  { label: "Total Votes", value: "18,943", icon: Heart },
  { label: "Pengguna Aktif", value: "5,672", icon: Users },
  { label: "Kota Terdaftar", value: "34", icon: MapPin },
]

export default function HomePage() {
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))

  useEffect(() => {
    const timer = setTimeout(() => {
      stats.forEach((stat, index) => {
        const targetValue = parseInt(stat.value.replace(/,/g, ""))
        let current = 0
        const increment = targetValue / 50
        const interval = setInterval(() => {
          current += increment
          if (current >= targetValue) {
            current = targetValue
            clearInterval(interval)
          }
          setAnimatedStats((prev) => {
            const newStats = [...prev]
            newStats[index] = Math.floor(current)
            return newStats
          })
        }, 30)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                <Sparkles className="mr-2 h-3 w-3" />
                Platform Voting Sekolah Terpercaya
              </Badge>
              <h1 className="text-balance mb-6 text-foreground">
                Temukan dan Pilih
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}Sekolah Terbaik{" "}
                </span>
                di Indonesia
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Bergabunglah dengan ribuan orang tua dan siswa dalam memilih institusi pendidikan terbaik. 
                Voting transparan, data akurat, hasil real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="btn-primary group" asChild>
                  <Link href="/register">
                    Mulai Voting Sekarang
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="btn-secondary" asChild>
                  <Link href="/statistics">
                    Lihat Statistik
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {animatedStats[index].toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Top Schools Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Trophy className="mr-2 h-3 w-3" />
              Top Ranking
            </Badge>
            <h2 className="mb-4">Sekolah Terbaik Pilihan Masyarakat</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sekolah-sekolah dengan rating tertinggi berdasarkan voting dari ribuan pengguna
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topSchools.map((school, index) => (
              <Card key={school.id} className="card-interactive group animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    #{school.rank}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{school.name}</h3>
                  <div className="flex items-center text-muted-foreground mb-3">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span className="text-sm">{school.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {school.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-yellow-50 rounded-full px-3 py-1">
                        <Star className="mr-1 h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-yellow-700">{school.rating}</span>
                      </div>
                      <div className="flex items-center bg-blue-50 rounded-full px-3 py-1">
                        <Users className="mr-1 h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-700">{school.votes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full btn-primary group" asChild>
                    <Link href={`/school/${school.id}`}>
                      <Heart className="mr-2 h-4 w-4" />
                      Vote Sekarang
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="btn-secondary" asChild>
              <Link href="/schools">
                Lihat Semua Sekolah
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Mengapa Memilih SchoolVote?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Platform terpercaya dengan fitur-fitur canggih untuk membantu Anda membuat keputusan terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="card-modern bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="mb-4">Siap Memulai Voting?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Bergabunglah dengan komunitas SchoolVote dan berikan suara Anda untuk sekolah terbaik di Indonesia
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-primary" asChild>
                    <Link href="/register">
                      Daftar Gratis Sekarang
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="btn-secondary" asChild>
                    <Link href="/how-to-use">
                      Pelajari Cara Kerja
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Trophy className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold text-foreground">SchoolVote</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Platform voting sekolah terpercaya yang membantu siswa dan orang tua menemukan institusi pendidikan terbaik di Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/schools" className="hover:text-foreground transition-colors">Daftar Sekolah</Link></li>
                <li><Link href="/statistics" className="hover:text-foreground transition-colors">Statistik</Link></li>
                <li><Link href="/how-to-use" className="hover:text-foreground transition-colors">Cara Penggunaan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Dukungan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/help" className="hover:text-foreground transition-colors">Bantuan</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Syarat & Ketentuan</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SchoolVote. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}