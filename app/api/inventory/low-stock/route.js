import { connectToDatabase } from "@/components/lib/db"
import Book from "@/components/lib/models/Book"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()
    const lowStockBooks = await Book.find({ quantity: { $lte: "$threshold" } }).sort("quantity")

    return NextResponse.json(lowStockBooks)
  } catch (error) {
    console.error("Error fetching low stock books:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب الكتب منخفضة المخزون" }, { status: 500 })
  }
}
