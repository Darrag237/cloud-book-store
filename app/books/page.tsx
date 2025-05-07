"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Search, SlidersHorizontal, BookOpen, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

// نموذج بيانات للكتب
const booksData = [
  {
    id: "1",
    title: "رواية الأمير الصغير",
    author: "أنطوان دو سانت إكزوبيري",
    price: 45,
    image: "/placeholder.svg?height=300&width=200",
    category: "روايات",
    quantity: 25,
    vendorId: "v1",
    description:
      "رواية فلسفية للكاتب الفرنسي أنطوان دو سانت إكزوبيري، تحكي قصة طيار تعطلت طائرته في الصحراء ويلتقي بأمير صغير من كوكب آخر.",
  },
  {
    id: "2",
    title: "مئة عام من العزلة",
    author: "غابرييل غارسيا ماركيز",
    price: 60,
    image: "/placeholder.svg?height=300&width=200",
    category: "روايات",
    quantity: 15,
    vendorId: "v2",
    description: "رواية ملحمية تحكي قصة عائلة بوينديا على مدى سبعة أجيال في قرية ماكوندو الخيالية.",
  },
  {
    id: "3",
    title: "البرمجة بلغة جافاسكريبت",
    author: "محمد أحمد",
    price: 85,
    image: "/placeholder.svg?height=300&width=200",
    category: "تقنية",
    quantity: 30,
    vendorId: "v1",
    description: "كتاب شامل لتعلم لغة البرمجة جافاسكريبت من الصفر حتى الاحتراف.",
  },
  {
    id: "4",
    title: "علم النفس الإيجابي",
    author: "سارة الحسن",
    price: 55,
    image: "/placeholder.svg?height=300&width=200",
    category: "تنمية ذاتية",
    quantity: 20,
    vendorId: "v3",
    description: "كتاب يشرح مبادئ علم النفس الإيجابي وكيفية تطبيقها في الحياة اليومية.",
  },
  {
    id: "5",
    title: "تعلم التسويق الإلكتروني",
    author: "فهد العتيبي",
    price: 70,
    image: "/placeholder.svg?height=300&width=200",
    category: "تسويق",
    quantity: 25,
    vendorId: "v1",
    description: "دليل شامل للتسويق الإلكتروني وكيفية بناء استراتيجيات تسويقية ناجحة عبر الإنترنت.",
  },
  {
    id: "6",
    title: "الذكاء الاصطناعي للمبتدئين",
    author: "عبدالله العمري",
    price: 90,
    image: "/placeholder.svg?height=300&width=200",
    category: "تقنية",
    quantity: 15,
    vendorId: "v2",
    description: "مدخل إلى عالم الذكاء الاصطناعي وتعلم الآلة للمبتدئين بأسلوب مبسط وعملي.",
  },
  {
    id: "7",
    title: "فن الطهي العربي",
    author: "ليلى الخالدي",
    price: 65,
    image: "/placeholder.svg?height=300&width=200",
    category: "طبخ",
    quantity: 20,
    vendorId: "v3",
    description: "كتاب يحتوي على أشهر وصفات المطبخ العربي التقليدي والحديث مع شرح مفصل لطرق التحضير.",
  },
  {
    id: "8",
    title: "تاريخ الحضارة الإسلامية",
    author: "محمد السيد",
    price: 75,
    image: "/placeholder.svg?height=300&width=200",
    category: "تاريخ",
    quantity: 18,
    vendorId: "v1",
    description: "كتاب يستعرض تاريخ الحضارة الإسلامية وإنجازاتها في مختلف المجالات العلمية والثقافية.",
  },
]

// قائمة التصنيفات
const categories = [
  { id: "all", name: "جميع التصنيفات" },
  { id: "روايات", name: "روايات" },
  { id: "تقنية", name: "تقنية" },
  { id: "تنمية ذاتية", name: "تنمية ذاتية" },
  { id: "تسويق", name: "تسويق" },
  { id: "طبخ", name: "طبخ" },
  { id: "تاريخ", name: "تاريخ" },
]

export default function BooksPage() {
  const { toast } = useToast()
  const [books, setBooks] = useState(booksData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedAuthors, setSelectedAuthors] = useState([])
  const [sortBy, setSortBy] = useState("default")

  // استخراج قائمة المؤلفين الفريدة
  const authors = [...new Set(booksData.map((book) => book.author))]

  // تصفية الكتب حسب المعايير المحددة
  const filteredBooks = books.filter((book) => {
    // البحث
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())

    // التصنيف
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory

    // نطاق السعر
    const matchesPriceRange = book.price >= priceRange[0] && book.price <= priceRange[1]

    // المؤلف
    const matchesAuthor = selectedAuthors.length === 0 || selectedAuthors.includes(book.author)

    return matchesSearch && matchesCategory && matchesPriceRange && matchesAuthor
  })

  // ترتيب الكتب
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "title-asc":
        return a.title.localeCompare(b.title)
      case "title-desc":
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  // إضافة إلى السلة
  const addToCart = (bookId) => {
    toast({
      title: "تمت الإضافة إلى السلة",
      description: "تمت إضافة الكتاب إلى عربة التسوق بنجاح",
    })
  }

  // تحديث قائمة المؤلفين المحددين
  const toggleAuthor = (author) => {
    setSelectedAuthors((prev) => (prev.includes(author) ? prev.filter((a) => a !== author) : [...prev, author]))
  }

  // إعادة تعيين الفلاتر
  const resetFilters = () => {
    setSelectedCategory("all")
    setPriceRange([0, 100])
    setSelectedAuthors([])
    setSortBy("default")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">تصفح الكتب</h1>

      {/* شريط البحث والفلترة */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ابحث عن كتاب..."
            className="pl-10 rtl:pr-10 rtl:pl-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">الترتيب الافتراضي</option>
            <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
            <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
            <option value="title-asc">العنوان: أ-ي</option>
            <option value="title-desc">العنوان: ي-أ</option>
          </select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="px-3">
                <SlidersHorizontal className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                فلترة متقدمة
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>خيارات الفلترة</SheetTitle>
                <SheetDescription>قم بتخصيص نتائج البحث حسب احتياجاتك</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">التصنيف</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(1).map((category) => (
                      <div key={category.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategory === category.id}
                          onCheckedChange={() => setSelectedCategory(category.id)}
                        />
                        <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">نطاق السعر</h3>
                    <span className="text-sm">
                      {priceRange[0]} - {priceRange[1]} ر.س
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">المؤلف</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {authors.map((author) => (
                      <div key={author} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox
                          id={`author-${author}`}
                          checked={selectedAuthors.includes(author)}
                          onCheckedChange={() => toggleAuthor(author)}
                        />
                        <Label htmlFor={`author-${author}`}>{author}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={resetFilters}>
                    إعادة تعيين
                  </Button>
                  <SheetClose asChild>
                    <Button>تطبيق الفلاتر</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* عرض الفلاتر النشطة */}
      {(selectedCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 100 || selectedAuthors.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory !== "all" && (
            <div className="flex items-center bg-muted rounded-full px-3 py-1 text-sm">
              <span className="ml-2 rtl:mr-2 rtl:ml-0">التصنيف: {selectedCategory}</span>
              <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSelectedCategory("all")}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {(priceRange[0] > 0 || priceRange[1] < 100) && (
            <div className="flex items-center bg-muted rounded-full px-3 py-1 text-sm">
              <span className="ml-2 rtl:mr-2 rtl:ml-0">
                السعر: {priceRange[0]} - {priceRange[1]} ر.س
              </span>
              <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setPriceRange([0, 100])}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {selectedAuthors.map((author) => (
            <div key={author} className="flex items-center bg-muted rounded-full px-3 py-1 text-sm">
              <span className="ml-2 rtl:mr-2 rtl:ml-0">المؤلف: {author}</span>
              <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => toggleAuthor(author)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}

          <Button variant="ghost" size="sm" onClick={resetFilters}>
            مسح الكل
          </Button>
        </div>
      )}

      {/* عرض النتائج */}
      {sortedBooks.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">لا توجد نتائج</h2>
          <p className="text-muted-foreground mb-6">لم يتم العثور على كتب تطابق معايير البحث</p>
          <Button onClick={resetFilters}>إعادة تعيين الفلاتر</Button>
        </div>
      ) : (
        <div>
          <p className="mb-4">تم العثور على {sortedBooks.length} كتاب</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden flex flex-col">
                <Link href={`/books/${book.id}`}>
                  <div className="relative h-[250px] w-full">
                    <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" />
                  </div>
                </Link>
                <CardContent className="p-4 flex-1">
                  <Link href={`/books/${book.id}`}>
                    <h3 className="font-bold text-lg mb-1 hover:text-primary transition-colors">{book.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                  <p className="font-bold text-lg">{book.price} ر.س</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button onClick={() => addToCart(book.id)} className="w-full">
                    <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                    إضافة للسلة
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
