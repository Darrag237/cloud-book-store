"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart } from "lucide-react"

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

export default function BookList() {
  const { toast } = useToast()
  const [books] = useState(booksData)

  const addToCart = (bookId: string) => {
    toast({
      title: "تمت الإضافة إلى السلة",
      description: "تمت إضافة الكتاب إلى عربة التسوق بنجاح",
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
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
              <ShoppingCart className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              إضافة للسلة
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
