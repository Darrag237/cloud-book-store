"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BookOpen,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navItems = [
    {
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      roles: ["admin", "vendor", "customer", "storekeeper"],
    },
    {
      title: "الكتب",
      href: "/dashboard/books",
      icon: <Package className="h-5 w-5" />,
      roles: ["admin", "vendor"],
    },
    {
      title: "المستخدمين",
      href: "/dashboard/users",
      icon: <Users className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      title: "الطلبات",
      href: "/dashboard/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      roles: ["admin", "vendor", "customer"],
    },
    {
      title: "المخزون",
      href: "/dashboard/inventory",
      icon: <Package className="h-5 w-5" />,
      roles: ["admin", "storekeeper", "vendor"],
    },
    {
      title: "التقارير",
      href: "/dashboard/reports",
      icon: <BarChart3 className="h-5 w-5" />,
      roles: ["admin", "vendor"],
    },
    {
      title: "الإعدادات",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      roles: ["admin", "vendor", "customer", "storekeeper"],
    },
  ]

  const filteredNavItems = navItems.filter((item) => user && item.roles.includes(user.role))

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* زر القائمة للشاشات الصغيرة */}
      <Button variant="ghost" size="icon" className="fixed top-4 right-4 z-50 md:hidden" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* القائمة الجانبية */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-64 bg-background border-l transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:w-64",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">مكتبتنا</span>
            </Link>
          </div>

          <div className="p-4 border-b">
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-muted-foreground">
              {user?.role === "admin" && "مدير النظام"}
              {user?.role === "vendor" && "بائع"}
              {user?.role === "customer" && "عميل"}
              {user?.role === "storekeeper" && "أمين مخزن"}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-auto">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-md text-sm transition-colors",
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t mt-auto">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
