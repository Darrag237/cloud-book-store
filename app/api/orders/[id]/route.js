import { connectToDatabase } from "@/components/lib/db"
import Order from "@/components/lib/models/Order"
import Book from "@/components/lib/models/Book"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  try {
    const { id } = params

    await connectToDatabase()

    const order = await Order.findById(id)
      .populate("customerId", "name email")
      .populate("items.bookId", "title author image")

    if (!order) {
      return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب الطلب" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { status } = await request.json()

    if (!status) {
      return NextResponse.json({ error: "حالة الطلب مطلوبة" }, { status: 400 })
    }

    await connectToDatabase()

    const order = await Order.findById(id)

    if (!order) {
      return NextResponse.json({ error: "الطلب غير موجود" }, { status: 404 })
    }

    // إذا تم إلغاء الطلب، قم بإعادة الكميات إلى المخزون
    if (status === "cancelled" && order.status !== "cancelled") {
      for (const item of order.items) {
        const book = await Book.findById(item.bookId)
        if (book) {
          book.quantity += item.quantity
          await book.save()
        }
      }
    }

    order.status = status
    await order.save()

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء تحديث حالة الطلب" }, { status: 500 })
  }
}
