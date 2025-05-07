// اتصال بقاعدة بيانات MongoDB
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore"

// التحقق من وجود URI لقاعدة البيانات
if (!MONGODB_URI) {
  throw new Error("يرجى تحديد MONGODB_URI في ملف .env")
}

/**
 * متغير عام لحالة الاتصال
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

/**
 * دالة للاتصال بقاعدة البيانات
 */
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Connected to MongoDB")
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error("Error connecting to MongoDB:", e)
    throw e
  }

  return cached.conn
}

export default { connectToDatabase }
