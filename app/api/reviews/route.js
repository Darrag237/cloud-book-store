import { connectToDatabase } from "@/components/lib/db"
import Review from "@/components/lib/models/Review"
import { NextResponse } from "next/server"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get("book_id")

    await connectToDatabase()

    const query = {}
    if (bookId) {
      query.bookId = bookId
    }

    const reviews = await Review.find(query).populate("userId", "name").sort({ date: -1 })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب التقييمات" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { bookId, userId, rating, comment } = await request.json()

    if (!bookId || !userId || !rating) {
      return NextResponse.json({ error: "جميع الحقول المطلوبة غير مكتملة" }, { status: 400 })
    }

    await connectToDatabase()

    // التحقق من وجود تقييم سابق
    let review = await Review.findOne({ bookId, userId })

    if (review) {
      // تحديث التقييم الموجود
      review.rating = rating
      review.comment = comment
      review.date = new Date()
      await review.save()
    } else {
      // إنشاء تقييم جديد
      review = new Review({
        bookId,
        userId,
        rating,
        comment,
        date: new Date(),
      })
      await review.save()
    }

    // إرجاع التقييم مع بيانات المستخدم
    const populatedReview = await Review.findById(review._id).populate("userId", "name")

    return NextResponse.json(populatedReview)
  } catch (error) {
    console.error("Error creating/updating review:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء إنشاء/تحديث التقييم" }, { status: 500 })
  }
}
