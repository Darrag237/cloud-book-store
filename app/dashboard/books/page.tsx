"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Plus, Search, MoreVertical, Trash2, Eye, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

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
]

export default function BooksPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [books, setBooks] = useState(booksData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  // نموذج بيانات للكتاب الجديد
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
    image: null,
  })

  // تصفية الكتب حسب البائع إذا كان المستخدم بائعاً
  const filteredBooks =
    user?.role === "vendor"
      ? books.filter((book) => book.vendorId === "v1") // افتراضياً نستخدم v1 للبائع الحالي
      : books

  // البحث في الكتب
  const searchedBooks = searchTerm
    ? filteredBooks.filter(
        (book) =>
          book.title.includes(searchTerm) || book.author.includes(searchTerm) || book.category.includes(searchTerm),
      )
    : filteredBooks

  // إضافة كتاب جديد
  const handleAddBook = () => {
    const bookId = Math.random().toString(36).substr(2, 9)
    const newBookWithId = {
      ...newBook,
      id: bookId,
      price: Number.parseFloat(newBook.price),
      quantity: Number.parseInt(newBook.quantity),
      vendorId: "v1", // افتراضياً نستخدم v1 للبائع الحالي
      image: "/placeholder.svg?height=300&width=200", // صورة افتراضية
    }

    setBooks([...books, newBookWithId])
    setNewBook({
      title: "",
      author: "",
      price: "",
      category: "",
      quantity: "",
      description: "",
      image: null,
    })
    setIsAddDialogOpen(false)

    toast({
      title: "تمت الإضافة بنجاح",
      description: "تم إضافة الكتاب الجديد بنجاح",
    })
  }

  // تحديث كتاب
  const handleUpdateBook = () => {
    const updatedBooks = books.map((book) => (book.id === selectedBook.id ? selectedBook : book))

    setBooks(updatedBooks)
    setIsEditDialogOpen(false)

    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث بيانات الكتاب بنجاح",
    })
  }

  // حذف كتاب
  const handleDeleteBook = () => {
    const updatedBooks = books.filter((book) => book.id !== selectedBook.id)

    setBooks(updatedBooks)
    setIsDeleteDialogOpen(false)

    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف الكتاب بنجاح",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">إدارة الكتب</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
          إضافة كتاب جديد
        </Button>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن كتاب..."
            className="pl-10 rtl:pr-10 rtl:pl-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="التصنيف" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع التصنيفات</SelectItem>
            <SelectItem value="روايات">روايات</SelectItem>
            <SelectItem value="تقنية">تقنية</SelectItem>
            <SelectItem value="تنمية ذاتية">تنمية ذاتية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">الصورة</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead>المؤلف</TableHead>
              <TableHead>التصنيف</TableHead>
              <TableHead>السعر</TableHead>
              <TableHead>الكمية</TableHead>
              <TableHead className="text-left rtl:text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchedBooks.map((book) => (
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
                <TableCell>{book.price} ر.س</TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">القائمة</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedBook(book)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedBook(book)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                        حذف
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/books/${book.id}`}>
                          <Eye className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                          عرض
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* نافذة إضافة كتاب جديد */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة كتاب جديد</DialogTitle>
            <DialogDescription>أدخل بيانات الكتاب الجديد هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                العنوان
              </Label>
              <Input
                id="title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-right">
                المؤلف
              </Label>
              <Input
                id="author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                السعر
              </Label>
              <Input
                id="price"
                type="number"
                value={newBook.price}
                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                التصنيف
              </Label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                value={newBook.category}
                onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
              >
                <option value="">اختر التصنيف</option>
                <option value="روايات">روايات</option>
                <option value="تقنية">تقنية</option>
                <option value="تنمية ذاتية">تنمية ذاتية</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                الكمية
              </Label>
              <Input
                id="quantity"
                type="number"
                value={newBook.quantity}
                onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                الوصف
              </Label>
              <Textarea
                id="description"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                الصورة
              </Label>
              <div className="col-span-3">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">اضغط للرفع</span> أو اسحب وأفلت
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG (الحد الأقصى: 2MB)</p>
                    </div>
                    <input id="image-upload" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddBook}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة تعديل كتاب */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>تعديل كتاب</DialogTitle>
            <DialogDescription>قم بتعديل بيانات الكتاب هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
          </DialogHeader>
          {selectedBook && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  العنوان
                </Label>
                <Input
                  id="edit-title"
                  value={selectedBook.title}
                  onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-author" className="text-right">
                  المؤلف
                </Label>
                <Input
                  id="edit-author"
                  value={selectedBook.author}
                  onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  السعر
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={selectedBook.price}
                  onChange={(e) => setSelectedBook({ ...selectedBook, price: Number.parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  التصنيف
                </Label>
                <select
                  id="edit-category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                  value={selectedBook.category}
                  onChange={(e) => setSelectedBook({ ...selectedBook, category: e.target.value })}
                >
                  <option value="روايات">روايات</option>
                  <option value="تقنية">تقنية</option>
                  <option value="تنمية ذاتية">تنمية ذاتية</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-quantity" className="text-right">
                  الكمية
                </Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={selectedBook.quantity}
                  onChange={(e) => setSelectedBook({ ...selectedBook, quantity: Number.parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  الوصف
                </Label>
                <Textarea
                  id="edit-description"
                  value={selectedBook.description}
                  onChange={(e) => setSelectedBook({ ...selectedBook, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  الصورة
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <Image
                      src={selectedBook.image || "/placeholder.svg"}
                      alt={selectedBook.title}
                      width={60}
                      height={80}
                      className="object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="edit-image-upload"
                          className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                        >
                          <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <Upload className="w-6 h-6 mb-1 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              <span className="font-semibold">تغيير الصورة</span>
                            </p>
                          </div>
                          <input id="edit-image-upload" type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateBook}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة تأكيد الحذف */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذا الكتاب؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeleteBook}>
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
