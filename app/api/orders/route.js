import { connectToDatabase } from "@/components/lib/db"
import Order from "@/components/lib/models/Order"
import Book from "@/components/lib/models/Book"
import User from "@/components/lib/models/User"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()

    const orders = await Order.find().populate("customerId", "name email").sort({ date: -1 })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب الطلبات" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { customerId, items } = await request.json()

    if (!customerId || !items || items.length === 0) {
      return NextResponse.json({ error: "جميع الحقول المطلوبة غير مكتملة" }, { status: 400 })
    }

    await connectToDatabase()

    // التحقق من وجود العميل
    const customer = await User.findById(customerId)
    if (!customer) {
      return NextResponse.json({ error: "العميل غير موجود" }, { status: 404 })
    }

    // حساب المجموع الكلي وتحديث المخزون
    let total = 0
    const orderItems = []

    for (const item of items) {
      const book = await Book.findById(item.bookId)

      if (!book) {
        return NextResponse.json({ error: `الكتاب برقم ${item.bookId} غير موجود` }, { status: 404 })
      }

      if (book.quantity < item.quantity) {
        return NextResponse.json(
          {
            error: `الكمية المطلوبة من كتاب ${book.title} غير متوفرة. المتوفر: ${book.quantity}`,
          },
          { status: 400 },
        )
      }

      // تحديث المخزون
      book.quantity -= item.quantity
      await book.save()

      // إضافة العنصر إلى الطلب
      orderItems.push({
        bookId: item.bookId,
        quantity: item.quantity,
        price: book.price,
      })

      total += book.price * item.quantity
    }

    // إنشاء الطلب
    const newOrder = new Order({
      customerId,
      items: orderItems,
      total,
      status: "pending",
      date: new Date(),
    })

    await newOrder.save()

    return NextResponse.json(newOrder)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء إنشاء الطلب" }, { status: 500 })
  }
}
