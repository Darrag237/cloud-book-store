import mongoose from "mongoose"

// تعريف مخطط الكتاب
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "عنوان الكتاب مطلوب"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "اسم المؤلف مطلوب"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "سعر الكتاب مطلوب"],
    min: 0,
  },
  image: {
    type: String,
    default: "/placeholder.svg?height=300&width=200",
  },
  category: {
    type: String,
    required: [true, "تصنيف الكتاب مطلوب"],
    trim: true,
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    trim: true,
  },
  publishDate: {
    type: String,
    trim: true,
  },
  pages: {
    type: Number,
    min: 0,
  },
  language: {
    type: String,
    trim: true,
  },
  isbn: {
    type: String,
    trim: true,
  },
  threshold: {
    type: Number,
    default: 10,
    min: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
})

// إنشاء النموذج إذا لم يكن موجوداً
const Book = mongoose.models.Book || mongoose.model("Book", bookSchema)

export default Book
