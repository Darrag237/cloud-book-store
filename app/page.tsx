import Link from "next/link"
import { BookOpen, ShoppingCart, User } from "lucide-react"
import BookList from "@/components/book-list"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">مكتبتنا</span>
          </Link>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">عربة التسوق</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">تسجيل الدخول</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button>تسجيل الدخول</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">مرحباً بك في مكتبتنا الإلكترونية</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              اكتشف آلاف الكتب من مختلف التصنيفات والمؤلفين بأسعار تنافسية
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <h3 className="font-bold text-lg mb-2">تشكيلة واسعة</h3>
              <p>آلاف العناوين من مختلف التصنيفات</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <h3 className="font-bold text-lg mb-2">شحن سريع</h3>
              <p>توصيل لجميع أنحاء البلاد</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <h3 className="font-bold text-lg mb-2">دفع آمن</h3>
              <p>طرق دفع متعددة وآمنة</p>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">أحدث الكتب</h2>
            <Link href="/books">
              <Button variant="outline">عرض الكل</Button>
            </Link>
          </div>
          <BookList />
        </section>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p>جميع الحقوق محفوظة © مكتبتنا {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
