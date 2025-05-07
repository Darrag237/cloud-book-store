"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Share2, ChevronLeft, Star, Minus, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// نموذج بيانات للكتب
const booksData = [
  {
    id: "1",
    title: "رواية الأمير الصغير",
    author: "أنطوان دو سانت إكزوبيري",
    price: 45,
    image: "/placeholder.svg?height=600&width=400",
    category: "روايات",
    quantity: 25,
    vendorId: "v1",
    description:
      "رواية فلسفية للكاتب الفرنسي أنطوان دو سانت إكزوبيري، تحكي قصة طيار تعطلت طائرته في الصحراء ويلتقي بأمير صغير من كوكب آخر. تعتبر من أشهر الروايات العالمية وتمت ترجمتها إلى أكثر من 300 لغة ولهجة حول العالم.",
    publishDate: "1943",
    pages: 96,
    language: "العربية",
    isbn: "9789776171718",
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        user: "أحمد محمد",
        rating: 5,
        comment: "من أجمل الروايات التي قرأتها، أنصح بها بشدة.",
        date: "2023/04/15",
      },
      {
        id: "r2",
        user: "سارة علي",
        rating: 4,
        comment: "رواية جميلة ومؤثرة، استمتعت بقراءتها كثيراً.",
        date: "2023/03/22",
      },
      {
        id: "r3",
        user: "خالد عبدالله",
        rating: 5,
        comment: "رواية رائعة تحمل الكثير من المعاني العميقة، أنصح بها للجميع.",
        date: "2023/02/10",
      },
    ],
  },
  {
    id: "2",
    title: "مئة عام من العزلة",
    author: "غابرييل غارسيا ماركيز",
    price: 60,
    image: "/placeholder.svg?height=600&width=400",
    category: "روايات",
    quantity: 15,
    vendorId: "v2",
    description:
      "رواية ملحمية تحكي قصة عائلة بوينديا على مدى سبعة أجيال في قرية ماكوندو الخيالية. تعتبر من أهم أعمال الأدب اللاتيني وأحد أشهر روايات الواقعية السحرية في العالم.",
    publishDate: "1967",
    pages: 417,
    language: "العربية",
    isbn: "9789776180085",
    rating: 4.5,
    reviews: [
      {
        id: "r1",
        user: "محمد أحمد",
        rating: 5,
        comment: "تحفة أدبية حقيقية، من أفضل ما قرأت في حياتي.",
        date: "2023/05/10",
      },
      {
        id: "r2",
        user: "فاطمة علي",
        rating: 4,
        comment: "رواية معقدة ولكنها ممتعة جداً، تحتاج لتركيز أثناء القراءة.",
        date: "2023/04/18",
      },
    ],
  },
  {
    id: "3",
    title: "البرمجة بلغة جافاسكريبت",
    author: "محمد أحمد",
    price: 85,
    image: "/placeholder.svg?height=600&width=400",
    category: "تقنية",
    quantity: 30,
    vendorId: "v1",
    description:
      "كتاب شامل لتعلم لغة البرمجة جافاسكريبت من الصفر حتى الاحتراف. يغطي الكتاب أساسيات اللغة والمفاهيم المتقدمة مثل البرمجة كائنية التوجه والدوال السهمية والتعامل مع DOM وأطر العمل الحديثة.",
    publishDate: "2022",
    pages: 450,
    language: "العربية",
    isbn: "9789776180092",
    rating: 4.7,
    reviews: [
      {
        id: "r1",
        user: "عبدالله محمد",
        rating: 5,
        comment: "كتاب رائع للمبتدئين في عالم البرمجة، شرح مبسط وأمثلة عملية.",
        date: "2023/05/05",
      },
      {
        id: "r2",
        user: "نورة سعد",
        rating: 4,
        comment: "استفدت كثيراً من هذا الكتاب في تعلم جافاسكريبت.",
        date: "2023/04/12",
      },
    ],
  },
  {
    id: "4",
    title: "علم النفس الإيجابي",
    author: "سارة الحسن",
    price: 55,
    image: "/placeholder.svg?height=600&width=400",
    category: "تنمية ذاتية",
    quantity: 20,
    vendorId: "v3",
    description:
      "كتاب يشرح مبادئ علم النفس الإيجابي وكيفية تطبيقها في الحياة اليومية. يتناول الكتاب مواضيع مثل السعادة والتفاؤل والامتنان والعلاقات الإيجابية وكيفية بناء حياة ذات معنى.",
    publishDate: "2021",
    pages: 320,
    language: "العربية",
    isbn: "9789776180108",
    rating: 4.6,
    reviews: [
      {
        id: "r1",
        user: "فهد العتيبي",
        rating: 5,
        comment: "كتاب قيم جداً، غير نظرتي للحياة بشكل إيجابي.",
        date: "2023/03/20",
      },
      {
        id: "r2",
        user: "منى سعيد",
        rating: 4,
        comment: "استفدت كثيراً من النصائح العملية في الكتاب.",
        date: "2023/02/15",
      },
    ],
  },
]

export default function BookDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const bookId = params.id

  const [book, setBook] = useState(null)

  useEffect(() => {
    // البحث عن الكتاب بناءً على المعرف
    const foundBook = booksData.find((b) => b.id === bookId)
    setBook(foundBook)
  }, [bookId])

  // إذا لم يتم العثور على الكتاب
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">الكتاب غير موجود</h1>
        <p className="mb-6">عذراً، لم يتم العثور على الكتاب المطلوب.</p>
        <Button asChild>
          <Link href="/books">العودة إلى قائمة الكتب</Link>
        </Button>
      </div>
    )
  }

  const [quantity, setQuantity] = useState(1)

  // زيادة الكمية
  const increaseQuantity = () => {
    if (quantity < book.quantity) {
      setQuantity(quantity + 1)
    } else {
      toast({
        title: "تنبيه",
        description: "لا يمكن طلب كمية أكبر من المتوفرة في المخزون",
      })
    }
  }

  // إنقاص الكمية
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // إضافة إلى السلة
  const addToCart = () => {
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${quantity} نسخة من "${book.title}" إلى عربة التسوق`,
    })
  }

  // إضافة إلى المفضلة
  const addToWishlist = () => {
    toast({
      title: "تمت الإضافة إلى المفضلة",
      description: `تمت إضافة "${book.title}" إلى قائمة المفضلة`,
    })
  }

  // مشاركة الكتاب
  const shareBook = () => {
    // في التطبيق الحقيقي، هنا سيتم تنفيذ وظيفة المشاركة
    toast({
      title: "مشاركة",
      description: "تم نسخ رابط الكتاب إلى الحافظة",
    })
  }

  // عرض التقييم بالنجوم
  const renderRating = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 fill-primary text-primary" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-5 h-5 text-muted-foreground" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="w-5 h-5 fill-primary text-primary" />
          </div>
        </div>,
      )
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-muted-foreground" />)
    }

    return <div className="flex">{stars}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* زر العودة */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/books" className="flex items-center">
            <ChevronLeft className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
            العودة إلى قائمة الكتب
          </Link>
        </Button>
      </div>

      {/* تفاصيل الكتاب */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* صورة الكتاب */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            <Image src={book.image || "/placeholder.svg"} alt={book.title} fill className="object-cover" priority />
          </div>
        </div>

        {/* معلومات الكتاب */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">{book.author}</p>

            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              {renderRating(book.rating)}
              <span className="text-sm text-muted-foreground">({book.reviews.length} تقييم)</span>
            </div>

            <p className="text-2xl font-bold text-primary mb-4">{book.price} ر.س</p>

            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="text-sm font-medium">الحالة:</span>
              {book.quantity > 0 ? (
                <span className="text-green-600 font-medium">متوفر</span>
              ) : (
                <span className="text-red-600 font-medium">غير متوفر</span>
              )}
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
              <span className="text-sm font-medium">الكمية المتوفرة:</span>
              <span>{book.quantity} نسخة</span>
            </div>
          </div>

          {/* اختيار الكمية */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <span className="font-medium">الكمية:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={increaseQuantity}
                disabled={quantity >= book.quantity}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="flex flex-wrap gap-4">
            <Button className="flex-1" onClick={addToCart} disabled={book.quantity === 0}>
              <ShoppingCart className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
              إضافة إلى السلة
            </Button>
            <Button variant="outline" onClick={addToWishlist}>
              <Heart className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
              إضافة للمفضلة
            </Button>
            <Button variant="ghost" size="icon" onClick={shareBook}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* معلومات إضافية */}
          <div className="border-t pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">التصنيف</p>
                <p className="text-sm text-muted-foreground">{book.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium">تاريخ النشر</p>
                <p className="text-sm text-muted-foreground">{book.publishDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">عدد الصفحات</p>
                <p className="text-sm text-muted-foreground">{book.pages} صفحة</p>
              </div>
              <div>
                <p className="text-sm font-medium">اللغة</p>
                <p className="text-sm text-muted-foreground">{book.language}</p>
              </div>
              <div>
                <p className="text-sm font-medium">الرقم المعياري (ISBN)</p>
                <p className="text-sm text-muted-foreground">{book.isbn}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* تفاصيل إضافية وتقييمات */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full border-b mb-0 rounded-none justify-start">
            <TabsTrigger value="description" className="rounded-b-none">
              الوصف
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-b-none">
              التقييمات ({book.reviews.length})
            </TabsTrigger>
          </TabsList>
          <div className="border border-t-0 rounded-b-lg p-6">
            <TabsContent value="description" className="mt-0">
              <p className="leading-relaxed">{book.description}</p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-0 space-y-6">
              {/* ملخص التقييمات */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold">{book.rating}</span>
                  <div className="flex mt-1">{renderRating(book.rating)}</div>
                  <span className="text-sm text-muted-foreground mt-1">({book.reviews.length} تقييم)</span>
                </div>
                <Separator orientation="vertical" className="h-20" />
                <div className="flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-12 text-sm">5 نجوم</span>
                      <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                        <div
                          className="h-2 bg-primary rounded-full"
                          style={{
                            width: `${(book.reviews.filter((r) => r.rating === 5).length / book.reviews.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-right">
                        {book.reviews.filter((r) => r.rating === 5).length}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm">4 نجوم</span>
                      <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                        <div
                          className="h-2 bg-primary rounded-full"
                          style={{
                            width: `${(book.reviews.filter((r) => r.rating === 4).length / book.reviews.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-right">
                        {book.reviews.filter((r) => r.rating === 4).length}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm">3 نجوم</span>
                      <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                        <div
                          className="h-2 bg-primary rounded-full"
                          style={{
                            width: `${(book.reviews.filter((r) => r.rating === 3).length / book.reviews.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-right">
                        {book.reviews.filter((r) => r.rating === 3).length}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm">2 نجوم</span>
                      <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                        <div
                          className="h-2 bg-primary rounded-full"
                          style={{
                            width: `${(book.reviews.filter((r) => r.rating === 2).length / book.reviews.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-right">
                        {book.reviews.filter((r) => r.rating === 2).length}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-12 text-sm">1 نجمة</span>
                      <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                        <div
                          className="h-2 bg-primary rounded-full"
                          style={{
                            width: `${(book.reviews.filter((r) => r.rating === 1).length / book.reviews.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="w-8 text-sm text-right">
                        {book.reviews.filter((r) => r.rating === 1).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* قائمة التقييمات */}
              <div className="space-y-6">
                {book.reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    <Separator />
                  </div>
                ))}
              </div>

              {/* زر إضافة تقييم */}
              <div className="text-center">
                <Button>إضافة تقييم</Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* كتب مشابهة */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">كتب مشابهة قد تعجبك</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {booksData
            .filter((b) => b.id !== book.id && b.category === book.category)
            .slice(0, 4)
            .map((similarBook) => (
              <div key={similarBook.id} className="border rounded-lg overflow-hidden">
                <Link href={`/books/${similarBook.id}`}>
                  <div className="relative h-[250px] w-full">
                    <Image
                      src={similarBook.image || "/placeholder.svg"}
                      alt={similarBook.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/books/${similarBook.id}`}>
                    <h3 className="font-bold text-lg mb-1 hover:text-primary transition-colors">{similarBook.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{similarBook.author}</p>
                  <p className="font-bold text-lg">{similarBook.price} ر.س</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
