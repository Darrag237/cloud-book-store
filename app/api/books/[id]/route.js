import { connectToDatabase } from "@/components/lib/db"
import Book from "@/components/lib/models/Book"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  try {
    const { id } = params

    await connectToDatabase()
    const book = await Book.findById(id)

    if (!book) {
      return NextResponse.json({ error: "الكتاب غير موجود" }, { status: 404 })
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error("Error fetching book:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب الكتاب" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { title, author, price, image, category, quantity, description } = await request.json()

    if (!title || !author || !price || !category) {
      return NextResponse.json({ error: "جميع الحقول المطلوبة غير مكتملة" }, { status: 400 })
    }

    await connectToDatabase()

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        price,
        image,
        category,
        quantity,
        description,
        lastUpdated: new Date(),
      },
      { new: true, runValidators: true },
    )

    if (!updatedBook) {
      return NextResponse.json({ error: "الكتاب غير موجود" }, { status: 404 })
    }

    return NextResponse.json(updatedBook)
  } catch (error) {
    console.error("Error updating book:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء تحديث الكتاب" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    await connectToDatabase()
    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) {
      return NextResponse.json({ error: "الكتاب غير موجود" }, { status: 404 })
    }

    return NextResponse.json({ message: "تم حذف الكتاب بنجاح" })
  } catch (error) {
    console.error("Error deleting book:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء حذف الكتاب" }, { status: 500 })
  }
}
