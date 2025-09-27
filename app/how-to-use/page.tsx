"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, HelpCircle, LogIn, UserPlus, Vote, CreditCard, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HowToUsePage() {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8 text-blue-500" />,
      title: "Daftar Akun",
      description: "Buat akun baru dengan email dan password yang valid",
      color: "bg-blue-100",
    },
    {
      icon: <LogIn className="w-8 h-8 text-green-500" />,
      title: "Login",
      description: "Masuk ke akun Anda untuk mulai voting",
      color: "bg-green-100",
    },
    {
      icon: <Vote className="w-8 h-8 text-purple-500" />,
      title: "Pilih Sekolah",
      description: "Pilih sekolah favorit Anda dan tentukan jumlah vote",
      color: "bg-purple-100",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-orange-500" />,
      title: "Bayar & Vote",
      description: "Lakukan pembayaran dan vote Anda akan terhitung",
      color: "bg-orange-100",
    },
  ]

  return (
    <div className="min-h-screen bg-yellow-100">
      <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-purple-500 rounded-lg animate-wiggle"></div>
              <h1 className="text-lg font-bold text-purple-600">SchoolVote</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                <Home className="w-5 h-5 text-purple-600" />
              </Link>
              <Link href="/how-to-use" className="p-2 bg-purple-100 rounded-lg">
                <HelpCircle className="w-5 h-5 text-purple-600" />
              </Link>
              <Link href="/login" className="p-2 hover:bg-purple-100 rounded-lg transition-colors">
                <LogIn className="w-5 h-5 text-purple-600" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <HelpCircle className="w-12 h-12 text-purple-500 animate-float" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-purple-600 mb-4">Cara Menggunakan SchoolVote</h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Ikuti langkah-langkah sederhana berikut untuk mulai voting sekolah terbaik di Indonesia
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className={`${step.color} border-3 border-white shadow-lg hover-lift`}>
              <CardContent className="p-6 bg-white rounded-lg m-2">
                <div className="flex items-start space-x-4">
                  <div className={`${step.color} p-3 rounded-lg`}>{step.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-3 border-white shadow-lg">
          <CardContent className="p-8 bg-white rounded-lg m-2 text-center">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-float" />
            <h3 className="text-xl font-bold text-gray-800 mb-3">Tips Voting</h3>
            <ul className="text-sm text-gray-600 space-y-2 mb-6 text-left max-w-md mx-auto">
              <li className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-purple-500" />
                <span>Satu akun dapat memberikan multiple vote</span>
              </li>
              <li className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-purple-500" />
                <span>Harga per vote adalah Rp 1.000</span>
              </li>
              <li className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-purple-500" />
                <span>Vote dapat diberikan untuk sekolah yang berbeda</span>
              </li>
              <li className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-purple-500" />
                <span>Hasil voting dapat dilihat secara real-time</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white cartoon-button">Daftar Sekarang</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="border-2 border-purple-500 hover:bg-purple-100 bg-white">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
