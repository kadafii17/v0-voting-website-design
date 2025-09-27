"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, LogIn, Home, HelpCircle, User, Moon, Sun, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPersonalMenu, setShowPersonalMenu] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would typically make an API call to authenticate the user
    console.log("Login data:", formData)

    setIsSubmitting(false)
    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const isFormValid = formData.email.length > 0 && formData.password.length > 0

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
              <button className="p-2 hover:bg-purple-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </button>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowPersonalMenu(!showPersonalMenu)}
                className="p-2 bg-purple-100 dark:bg-gray-700 rounded-lg"
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

      <div className="flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 animate-bounce-in">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-xl animate-pulse-glow flex items-center justify-center">
                <LogIn className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">SchoolVote</h1>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Masuk ke akun Anda</p>
          </div>

          <Card className="glass-effect shadow-xl border-0 animate-slide-up hover-lift bg-white dark:bg-gray-800">
            <CardHeader className="space-y-1 text-center pb-4">
              <CardTitle className="text-lg font-bold text-blue-600 dark:text-blue-400">Masuk</CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-300 text-xs">
                Masukkan email dan password untuk mengakses akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-semibold text-xs">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-blue-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-9 h-9 text-xs border-gray-300 dark:border-gray-600 dark:bg-gray-700 hover:border-blue-400 focus:border-blue-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-semibold text-xs">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-blue-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password Anda"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-9 pr-9 h-9 text-xs border-gray-300 dark:border-gray-600 dark:bg-gray-700 hover:border-blue-400 focus:border-blue-500 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3 h-3 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <Label htmlFor="remember" className="text-gray-600 dark:text-gray-300 cursor-pointer text-xs">
                      Ingat saya
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors text-xs"
                  >
                    Lupa Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cartoon-button"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Masuk...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <LogIn className="w-3 h-3" />
                      <span>Masuk</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-6 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">atau</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-9 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105 text-xs"
                >
                  <svg className="w-3 h-3 mr-2" viewBox="0 0 24 24">
                    {/* ... existing Google icon paths ... */}
                  </svg>
                  Masuk dengan Google
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-xs">
                  Belum punya akun?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors hover:scale-105 inline-block"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-gray-500 dark:text-gray-400 animate-slide-up">
            <p className="text-xs">
              Dengan masuk, Anda menyetujui{" "}
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Syarat & Ketentuan
              </a>{" "}
              dan{" "}
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Kebijakan Privasi
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
