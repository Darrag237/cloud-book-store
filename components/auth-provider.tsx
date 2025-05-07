"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "vendor" | "customer" | "storekeeper"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string, role: string) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // محاكاة التحقق من الجلسة
    const checkSession = () => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    // محاكاة عملية تسجيل الدخول
    setIsLoading(true)

    // في التطبيق الحقيقي، هنا سيتم إرسال طلب للخادم للتحقق من بيانات المستخدم
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // بيانات مستخدمين للتجربة
        const users = [
          { id: "1", name: "مدير النظام", email: "admin@example.com", password: "password", role: "admin" },
          { id: "2", name: "بائع كتب", email: "vendor@example.com", password: "password", role: "vendor" },
          { id: "3", name: "عميل", email: "customer@example.com", password: "password", role: "customer" },
          { id: "4", name: "أمين المخزن", email: "store@example.com", password: "password", role: "storekeeper" },
        ]

        const foundUser = users.find((u) => u.email === email && u.password === password)

        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword as User)
          localStorage.setItem("user", JSON.stringify(userWithoutPassword))
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const register = async (name: string, email: string, password: string, role: string) => {
    // محاكاة عملية التسجيل
    setIsLoading(true)

    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // في التطبيق الحقيقي، هنا سيتم إرسال طلب للخادم لتسجيل المستخدم الجديد
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          role: role as "customer" | "vendor" | "storekeeper" | "admin",
        }

        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        setIsLoading(false)
        resolve(true)
      }, 1000)
    })
  }

  return <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
