"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/ui/navigation"
import { UserPlus, LogIn, Vote, CreditCard, Trophy, ArrowRight, HelpCircle } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    icon: UserPlus,
    title: "Daftar Akun",
    description: "Buat akun baru dengan email dan password yang valid untuk mulai menggunakan platform",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: LogIn,
    title: "Login ke Dashboard",
    description: "Masuk ke akun Anda dan akses dashboard untuk melihat semua fitur yang tersedia",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Vote,
    title: "Pilih Sekolah",
    description: "Pilih sekolah favorit Anda dari daftar yang tersedia dan tentukan jumlah vote yang ingin diberikan",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: CreditCard,
    title: "Bayar & Vote",
    description: "Lakukan pembayaran yang aman dan vote Anda akan langsung terhitung dalam sistem",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
]

const tips = [
  "Satu akun dapat memberikan multiple vote untuk sekolah yang berbeda",
  "Harga per vote adalah Rp 5.000 dengan sistem pembayaran yang aman",
  "Vote dapat diberikan untuk sekolah yang berbeda sesuai preferensi Anda",
  "Hasil voting dapat dilihat secara real-time di halaman statistik",
  "Semua transaksi dilindungi dengan enkripsi SSL untuk keamanan maksimal",
]

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Cara Menggunakan SchoolVote
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ikuti langkah-langkah sederhana berikut untuk mulai voting sekolah terbaik di Indonesia
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <Card key={index} className="card-modern">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${step.bg} p-3 rounded-xl flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                          {index + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tips Section */}
        <Card className="card-modern">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-50 text-yellow-600 mb-6">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Tips & Informasi Penting</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{tip}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary" asChild>
                <Link href="/register">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary" asChild>
                <Link href="/">
                  Kembali ke Beranda
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}