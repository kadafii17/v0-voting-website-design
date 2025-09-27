"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navigation } from "@/components/ui/navigation"
import {
  Check,
  X,
  Eye,
  EyeOff,
  UserPlus,
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Registration data:", formData)
    setIsSubmitting(false)
    
    // Redirect to login or dashboard
    window.location.href = "/login"
  }

  const isFormValid = validation.fullName && validation.email && validation.password && validation.passwordMatch

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
              <UserPlus className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bergabung dengan SchoolVote</h1>
            <p className="text-muted-foreground">Buat akun untuk mulai voting sekolah terbaik</p>
          </div>

          <Card className="card-modern">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl">Daftar Akun Baru</CardTitle>
              <CardDescription>
                Masukkan informasi Anda untuk membuat akun
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Nama Lengkap *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className={`form-input pl-10 pr-10 ${
                        formData.fullName.length > 0
                          ? validation.fullName
                            ? "border-success focus:ring-success"
                            : "border-destructive focus:ring-destructive"
                          : ""
                      }`}
                      required
                    />
                    {formData.fullName.length > 0 && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validation.fullName ? (
                          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {formData.fullName.length > 0 && !validation.fullName && (
                    <p className="text-xs text-destructive">
                      Nama lengkap minimal 2 karakter
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`form-input pl-10 pr-10 ${
                        formData.email.length > 0
                          ? validation.email
                            ? "border-success focus:ring-success"
                            : "border-destructive focus:ring-destructive"
                          : ""
                      }`}
                      required
                    />
                    {formData.email.length > 0 && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validation.email ? (
                          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {formData.email.length > 0 && !validation.email && (
                    <p className="text-xs text-destructive">Format email tidak valid</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 6 karakter"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`form-input pl-10 pr-16 ${
                        formData.password.length > 0
                          ? validation.password
                            ? "border-success focus:ring-success"
                            : "border-destructive focus:ring-destructive"
                          : ""
                      }`}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      {formData.password.length > 0 &&
                        (validation.password ? (
                          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  {formData.password.length > 0 && !validation.password && (
                    <p className="text-xs text-destructive">
                      Password minimal 6 karakter
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Konfirmasi Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password Anda"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`form-input pl-10 pr-16 ${
                        formData.confirmPassword.length > 0
                          ? validation.passwordMatch
                            ? "border-success focus:ring-success"
                            : "border-destructive focus:ring-destructive"
                          : ""
                      }`}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      {formData.confirmPassword.length > 0 &&
                        (validation.passwordMatch ? (
                          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                            <X className="w-3 h-3 text-white" />
                          </div>
                        ))}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  {formData.confirmPassword.length > 0 && !validation.passwordMatch && (
                    <p className="text-xs text-destructive">Password tidak cocok</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Mendaftar...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Daftar Sekarang</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">atau</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full btn-secondary"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Daftar dengan Google
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Sudah punya akun?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Login di sini
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>
              Dengan mendaftar, Anda menyetujui{" "}
              <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                Kebijakan Privasi
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}