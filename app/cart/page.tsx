"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Minus, Plus, ShoppingCart, Trash2, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// نموذج بيانات لعربة التسوق
const initialCartItems = [
  {
    id: "1",
    title: "رواية الأمير الصغير",
    author: "أنطوان دو سانت إكزوبيري",
    price: 45,
    image: "/placeholder.svg?height=300&width=200",
    quantity: 2,
    maxQuantity: 25,
  },
  {
    id: "3",
    title: "البرمجة بلغة جافاسكريبت",
    author: "محمد أحمد",
    price: 85,
    image: "/placeholder.svg?height=300&width=200",
    quantity: 1,
    maxQuantity: 30,
  },
]

export default function CartPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [discount, setDiscount] = useState(0)

  // حساب المجموع الفرعي
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // حساب الضريبة (15%)
  const tax = subtotal * 0.15

  // حساب المجموع الكلي
  const total = subtotal + tax - discount

  // زيادة كمية منتج
  const increaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          if (item.quantity < item.maxQuantity) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            toast({
              title: "تنبيه",
              description: "لا يمكن طلب كمية أكبر من المتوفرة في المخزون",
            })
          }
        }
        return item
      }),
    )
  }

  // إنقاص كمية منتج
  const decreaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      }),
    )
  }

  // حذف منتج من السلة
  const removeItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
    toast({
      title: "تم الحذف",
      description: "تم حذف المنتج من عربة التسوق",
    })
  }

  // تطبيق كوبون الخصم
  const applyCoupon = () => {
    setIsApplyingCoupon(true)

    // محاكاة طلب للخادم للتحقق من الكوبون
    setTimeout(() => {
      if (couponCode.toLowerCase() === "discount20") {
        const discountAmount = subtotal * 0.2 // خصم 20%
        setDiscount(discountAmount)
        toast({
          title: "تم تطبيق الكوبون",
          description: "تم تطبيق خصم 20% على طلبك",
        })
      } else {
        toast({
          title: "كوبون غير صالح",
          description: "الكوبون الذي أدخلته غير صالح أو منتهي الصلاحية",
          variant: "destructive",
        })
      }
      setIsApplyingCoupon(false)
    }, 1000)
  }

  // إتمام الطلب
  const checkout = () => {
    // في التطبيق الحقيقي، هنا سيتم توجيه المستخدم إلى صفحة الدفع
    toast({
      title: "جاري الانتقال إلى صفحة الدفع",
      description: "سيتم توجيهك إلى صفحة الدفع لإتمام الطلب",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">عربة التسوق</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">عربة التسوق فارغة</h2>
          <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات إلى عربة التسوق بعد</p>
          <Button asChild>
            <Link href="/books">تصفح الكتب</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* قائمة المنتجات */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 font-medium">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">المنتج</div>
                  <div className="col-span-2 text-center">السعر</div>
                  <div className="col-span-2 text-center">الكمية</div>
                  <div className="col-span-2 text-center">المجموع</div>
                </div>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="relative h-20 w-16 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              <Link href={`/books/${item.id}`} className="hover:text-primary">
                                {item.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-muted-foreground">{item.author}</p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-red-500 hover:text-red-700 flex items-center mt-1"
                            >
                              <Trash2 className="h-3 w-3 ml-1 rtl:mr-1 rtl:ml-0" />
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center">{item.price} ر.س</div>
                      <div className="col-span-2">
                        <div className="flex items-center justify-center border rounded-md max-w-[120px] mx-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => increaseQuantity(item.id)}
                            disabled={item.quantity >= item.maxQuantity}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-2 text-center font-medium">
                        {(item.price * item.quantity).toFixed(2)} ر.س
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/books" className="flex items-center">
                  <ChevronLeft className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                  متابعة التسوق
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCartItems([])
                  toast({
                    title: "تم تفريغ السلة",
                    description: "تم حذف جميع المنتجات من عربة التسوق",
                  })
                }}
              >
                <Trash2 className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                تفريغ السلة
              </Button>
            </div>
          </div>

          {/* ملخص الطلب */}
          <div>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4 font-medium">ملخص الطلب</div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة (15%)</span>
                  <span>{tax.toFixed(2)} ر.س</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span>- {discount.toFixed(2)} ر.س</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع</span>
                  <span>{total.toFixed(2)} ر.س</span>
                </div>

                <div className="pt-4">
                  <div className="flex space-x-2 rtl:space-x-reverse mb-4">
                    <Input placeholder="كود الخصم" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                    <Button variant="outline" onClick={applyCoupon} disabled={!couponCode || isApplyingCoupon}>
                      {isApplyingCoupon ? "جاري التطبيق..." : "تطبيق"}
                    </Button>
                  </div>

                  <Button className="w-full" onClick={checkout}>
                    <CreditCard className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                    إتمام الطلب
                  </Button>

                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    بالضغط على "إتمام الطلب"، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
