import { connectToDatabase } from "@/components/lib/db"
import Book from "@/components/lib/models/Book"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()
    const books = await Book.find().sort({ lastUpdated: -1 })

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب الكتب" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { title, author, price, image, category, quantity, description, vendorId } = await request.json()

    if (!title || !author || !price || !category) {
      return NextResponse.json({ error: "جميع الحقول المطلوبة غير مكتملة" }, { status: 400 })
    }

    await connectToDatabase()

    const newBook = new Book({
      title,
      author,
      price,
      image: image || "/placeholder.svg?height=300&width=200",
      category,
      quantity: quantity || 0,
      description,
      vendorId,
      lastUpdated: new Date(),
    })

    await newBook.save()

    return NextResponse.json(newBook)
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء إنشاء الكتاب" }, { status: 500 })
  }
}
