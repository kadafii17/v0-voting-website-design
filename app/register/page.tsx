"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Check,
  X,
  Eye,
  EyeOff,
  UserPlus,
  Home,
  HelpCircle,
  User,
  Moon,
  Sun,
  BarChart3,
  Settings,
  LogIn,
} from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPersonalMenu, setShowPersonalMenu] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Validation states
  const [validation, setValidation] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    passwordMatch: false,
  })

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Real-time validation
    const newValidation = { ...validation }

    switch (field) {
      case "fullName":
        newValidation.fullName = value.trim().length >= 2
        break
      case "email":
        newValidation.email = validateEmail(value)
        break
      case "password":
        newValidation.password = validatePassword(value)
        newValidation.passwordMatch = value === formData.confirmPassword && value.length > 0
        break
      case "confirmPassword":
        newValidation.confirmPassword = value.length > 0
        newValidation.passwordMatch = value === formData.password && value.length > 0
        break
    }

    setValidation(newValidation)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would typically make an API call to register the user
    console.log("Registration data:", formData)

    setIsSubmitting(false)
    // Redirect to login or dashboard
  }

  const isFormValid = validation.fullName && validation.email && validation.password && validation.passwordMatch

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

      <div className="flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 animate-bounce-in">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-xl animate-pulse-glow flex items-center justify-center">
                <UserPlus className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-purple-600 dark:text-purple-400">SchoolVote</h1>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Bergabunglah dengan komunitas voting sekolah</p>
          </div>

          <Card className="glass-effect shadow-xl border-0 animate-slide-up hover-lift bg-white dark:bg-gray-800">
            <CardHeader className="space-y-1 text-center pb-4">
              <CardTitle className="text-lg font-bold text-purple-600 dark:text-purple-400">Daftar Akun Baru</CardTitle>
              <CardDescription className="text-center text-gray-600 dark:text-gray-300 text-xs">
                Masukkan informasi Anda untuk membuat akun
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Field */}
                <div className="space-y-1">
                  <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300 font-semibold text-xs">
                    Nama Lengkap *
                  </Label>
                  <div className="relative">
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className={`pr-10 h-9 text-xs transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 ${
                        formData.fullName.length > 0
                          ? validation.fullName
                            ? "border-green-400 focus:border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-red-400 focus:border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-300 dark:border-gray-600 hover:border-purple-400"
                      }`}
                      required
                    />
                    {formData.fullName.length > 0 && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validation.fullName ? (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce-in">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {formData.fullName.length > 0 && !validation.fullName && (
                    <p className="text-xs text-red-600 dark:text-red-400 animate-slide-up">
                      Nama lengkap minimal 2 karakter
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-semibold text-xs">
                    Email *
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`pr-10 h-9 text-xs transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 ${
                        formData.email.length > 0
                          ? validation.email
                            ? "border-green-400 focus:border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-red-400 focus:border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-300 dark:border-gray-600 hover:border-purple-400"
                      }`}
                      required
                    />
                    {formData.email.length > 0 && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validation.email ? (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce-in">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {formData.email.length > 0 && !validation.email && (
                    <p className="text-xs text-red-600 dark:text-red-400 animate-slide-up">Format email tidak valid</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-semibold text-xs">
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 6 karakter"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pr-16 h-9 text-xs transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 ${
                        formData.password.length > 0
                          ? validation.password
                            ? "border-green-400 focus:border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-red-400 focus:border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-300 dark:border-gray-600 hover:border-purple-400"
                      }`}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      {formData.password.length > 0 &&
                        (validation.password ? (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce-in">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-500 hover:text-purple-600 transition-colors p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  {formData.password.length > 0 && !validation.password && (
                    <p className="text-xs text-red-600 dark:text-red-400 animate-slide-up">
                      Password minimal 6 karakter
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-semibold text-xs">
                    Konfirmasi Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password Anda"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`pr-16 h-9 text-xs transition-all duration-300 dark:bg-gray-700 dark:border-gray-600 ${
                        formData.confirmPassword.length > 0
                          ? validation.passwordMatch
                            ? "border-green-400 focus:border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-red-400 focus:border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-gray-300 dark:border-gray-600 hover:border-purple-400"
                      }`}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      {formData.confirmPassword.length > 0 &&
                        (validation.passwordMatch ? (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce-in">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-500 hover:text-purple-600 transition-colors p-1"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  {formData.confirmPassword.length > 0 && !validation.passwordMatch && (
                    <p className="text-xs text-red-600 dark:text-red-400 animate-slide-up">Password tidak cocok</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cartoon-button"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Mendaftar...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <UserPlus className="w-3 h-3" />
                      <span>Daftar Sekarang</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-xs">
                  Sudah punya akun?{" "}
                  <Link
                    href="/login"
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors hover:scale-105 inline-block"
                  >
                    Login di sini
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-gray-500 dark:text-gray-400 animate-slide-up">
            <p className="text-xs">
              Dengan mendaftar, Anda menyetujui{" "}
              <a
                href="#"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
              >
                Syarat & Ketentuan
              </a>{" "}
              dan{" "}
              <a
                href="#"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
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
