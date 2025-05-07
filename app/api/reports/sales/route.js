import { connectToDatabase } from "@/components/lib/db"
import Order from "@/components/lib/models/Order"
import Book from "@/components/lib/models/Book"
import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "month"

    await connectToDatabase()

    const dateFilter = new Date()
    switch (period) {
      case "week":
        dateFilter.setDate(dateFilter.getDate() - 7)
        break
      case "month":
        dateFilter.setMonth(dateFilter.getMonth() - 1)
        break
      case "quarter":
        dateFilter.setMonth(dateFilter.getMonth() - 3)
        break
      case "year":
        dateFilter.setFullYear(dateFilter.getFullYear() - 1)
        break
      default:
        dateFilter.setMonth(dateFilter.getMonth() - 1)
    }

    // إجمالي المبيعات
    const completedOrders = await Order.find({
      status: "completed",
      date: { $gte: dateFilter },
    })

    const totalSales = completedOrders.reduce((sum, order) => sum + order.total, 0)

    // المبيعات حسب الفئة
    const categorySales = []
    const categoryMap = new Map()

    // جمع جميع الكتب المباعة
    const orderItems = completedOrders.flatMap((order) => order.items)

    // جمع معلومات الكتب
    const bookIds = [...new Set(orderItems.map((item) => item.bookId))]
    const books = await Book.find({ _id: { $in: bookIds } })

    // حساب المبيعات حسب الفئة
    for (const order of completedOrders) {
      for (const item of order.items) {
        const book = books.find((b) => b._id.toString() === item.bookId.toString())
        if (book) {
          const category = book.category
          const amount = item.price * item.quantity

          if (categoryMap.has(category)) {
            categoryMap.set(category, categoryMap.get(category) + amount)
          } else {
            categoryMap.set(category, amount)
          }
        }
      }
    }

    // تحويل الخريطة إلى مصفوفة
    for (const [category, total] of categoryMap.entries()) {
      categorySales.push({ category, total })
    }

    // ترتيب حسب الإجمالي تنازلياً
    categorySales.sort((a, b) => b.total - a.total)

    // أكثر الكتب مبيعاً
    const bookSalesMap = new Map()

    for (const order of completedOrders) {
      for (const item of order.items) {
        const bookId = item.bookId.toString()

        if (bookSalesMap.has(bookId)) {
          const bookData = bookSalesMap.get(bookId)
          bookData.totalSold += item.quantity
          bookData.totalRevenue += item.price * item.quantity
        } else {
          bookSalesMap.set(bookId, {
            bookId,
            totalSold: item.quantity,
            totalRevenue: item.price * item.quantity,
          })
        }
      }
    }

    // تحويل الخريطة إلى مصفوفة
    let topBooks = Array.from(bookSalesMap.values())

    // إضافة معلومات الكتاب
    topBooks = await Promise.all(
      topBooks.map(async (item) => {
        const book = books.find((b) => b._id.toString() === item.bookId)
        return {
          ...item,
          title: book?.title || "كتاب غير معروف",
          author: book?.author || "مؤلف غير معروف",
        }
      }),
    )

    // ترتيب حسب الكمية المباعة تنازلياً
    topBooks.sort((a, b) => b.totalSold - a.totalSold)

    // أخذ أعلى 10 كتب
    topBooks = topBooks.slice(0, 10)

    return NextResponse.json({
      total_sales: totalSales,
      category_sales: categorySales,
      top_books: topBooks,
    })
  } catch (error) {
    console.error("Error generating sales report:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء إنشاء تقرير المبيعات" }, { status: 500 })
  }
}
