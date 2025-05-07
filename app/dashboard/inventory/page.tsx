"use client"

import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// نموذج بيانات للكتب
const booksData = [
  {
    id: "1",
    title: "رواية الأمير الصغير",
    author: "أنطوان دو سانت إكزوبيري",
    price: 45,
    image: "/placeholder.svg?height=300&width=200",
    category: "روايات",
    quantity: 5,
    vendorId: "v1",
    threshold: 10,
    lastUpdated: "2023/05/15",
  },
  {
    id: "2",
    title: "مئة عام من العزلة",
    author: "غابرييل غارسيا ماركيز",
    price: 60,
    image: "/placeholder.svg?height=300&width=200",
    category: "روايات",
    quantity: 3,
    vendorId: "v2",
    threshold: 10,
    lastUpdated: "2023/05/14",
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
    threshold: 15,
    lastUpdated: "2023/05/10",
  },
  {
    id: "4",
    title: "علم النفس الإيجابي",
    author: "سارة الحسن",
    price: 55,
    image: "/placeholder.svg?height=300&width=200",
    category: "تنمية ذاتية",
    quantity: 1,
    vendorId: "v3",
    threshold: 5,
    lastUpdated: "2023/05/12",
  },
  {
    id: "5",
    title: "تعلم التسويق الإلكتروني",
    author: "فهد العتيبي",
    price: 70,
    image: "/placeholder.svg?height=300&width=200",
    category: "تسويق",
    quantity: 2,
    vendorId: "v1",
    threshold: 8,
    lastUpdated: "2023/05/08",
  },
  {
    id: "6",
    title: "الذكاء الاصطناعي للمبتدئين",
    author: "عبدالله العمري",
    price: 90,
    image: "/placeholder.svg?height=300&width=200",
    category: "تقنية",
    quantity: 4,
    vendorId: "v2",
    threshold: 10,
    lastUpdated: "2023/05/05",
  },
]

export default function InventoryPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [books, setBooks] = useState(booksData)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [restockQuantity, setRestockQuantity] = useState("")

  // تصفية الكتب حسب البائع إذا كان المستخدم بائعاً
  const filteredBooks = (() => {
    let filtered =
      user?.role === "vendor"
        ? books.filter((book) => book.vendorId === "v1") // افتراضياً نستخدم v1 للبائع الحالي
        : books

    // تصفية حسب التصنيف
    if (categoryFilter !== "all") {
      filtered = filtered.filter((book) => book.category === categoryFilter)
    }

    // تصفية حسب حالة المخزون
    if (stockFilter === "low") {
      filtered = filtered.filter((book) => book.quantity <= book.threshold)
    } else if (stockFilter === "out") {
      filtered = filtered.filter((book) => book.quantity === 0)
    }

    // البحث
    if (searchTerm) {
      filtered = filtered.filter((book) => book.title.includes(searchTerm) || book.author.includes(searchTerm))
    }

    return filtered
  })()

  // إعادة تخزين كتاب
  const handleRestock = () => {
    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id
        ? {
            ...book,
            quantity: book.quantity + Number.parseInt(restockQuantity),
            lastUpdated: new Date().toISOString().split("T")[0].replace(/-/g, "/"),
          }
        : book,
    )

    setBooks(updatedBooks)
    setIsRestockDialogOpen(false)
    setRestockQuantity("")

    toast({
      title: "تم إعادة التخزين بنجاح",
      description: `تمت إضافة ${restockQuantity} نسخة من "${selectedBook.title}" إلى المخزون`,
    })
  }

  // عرض حالة المخزون بشكل مناسب
  const renderStockStatus = (book) => {
    if (book.quantity === 0) {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          نفذت الكمية
        </Badge>
      )
    } else if (book.quantity <= book.threshold) {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
          مخزون منخفض
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          متوفر
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">إدارة المخزون</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن كتاب..."
            className="pl-10 rtl:pr-10 rtl:pl-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="التصنيف" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع التصنيفات</SelectItem>
              <SelectItem value="روايات">روايات</SelectItem>
              <SelectItem value="تقنية">تقنية</SelectItem>
              <SelectItem value="تنمية ذاتية">تنمية ذاتية</SelectItem>
              <SelectItem value="تسويق">تسويق</SelectItem>
            </SelectContent>
          </Select>
          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="حالة المخزون" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="low">مخزون منخفض</SelectItem>
              <SelectItem value="out">نفذت الكمية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">الصورة</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead>المؤلف</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead className="text-center">الكمية</TableHead>
              <TableHead className="text-center">الحد الأدنى</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>آخر تحديث</TableHead>
              <TableHead className="text-left rtl:text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell>
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    width={50}
                    height={70}
                    className="object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell className="text-center">
                  {book.quantity <= book.threshold ? (
                    <span className={book.quantity === 0 ? "text-red-500 font-bold" : "text-amber-500 font-bold"}>
                      {book.quantity}
                    </span>
                  ) : (
                    book.quantity
                  )}
                </TableCell>
                <TableCell className="text-center">{book.threshold}</TableCell>
                <TableCell>{renderStockStatus(book)}</TableCell>
                <TableCell>{book.lastUpdated}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedBook(book)
                      setIsRestockDialogOpen(true)
                    }}
                  >
                    إعادة تخزين
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* نافذة إعادة التخزين */}
      <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إعادة تخزين</DialogTitle>
            <DialogDescription>أدخل الكمية التي ترغب في إضافتها إلى المخزون</DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Image
                  src={selectedBook.image || "/placeholder.svg"}
                  alt={selectedBook.title}
                  width={60}
                  height={80}
                  className="object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{selectedBook.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current-quantity" className="text-right">
                  الكمية الحالية
                </Label>
                <Input id="current-quantity" value={selectedBook.quantity} disabled className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="restock-quantity" className="text-right">
                  الكمية المضافة
                </Label>
                <Input
                  id="restock-quantity"
                  type="number"
                  min="1"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(e.target.value)}
                  className="col-span-3"
                />
              </div>
              {selectedBook.quantity <= selectedBook.threshold && (
                <div className="flex items-center text-amber-500">
                  <AlertTriangle className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                  <p className="text-sm">المخزون الحالي أقل من الحد الأدنى ({selectedBook.threshold})</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestockDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleRestock} disabled={!restockQuantity || Number.parseInt(restockQuantity) <= 0}>
              تأكيد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
