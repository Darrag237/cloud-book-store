// هذا ملف مثال لتوضيح كيفية التعامل مع المصادقة
import jwt from "jsonwebtoken"
import { connectToDatabase } from "./db"
import User from "./models/User"

// دالة للتحقق من صحة بيانات المستخدم
export async function authenticateUser(email, password) {
  try {
    await connectToDatabase()

    // البحث عن المستخدم بواسطة البريد الإلكتروني
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return null
    }

    // التحقق من كلمة المرور
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return null
    }

    // إرجاع بيانات المستخدم بدون كلمة المرور
    const userObject = user.toObject()
    delete userObject.password

    return userObject
  } catch (error) {
    console.error("Error authenticating user:", error)
    return null
  }
}

// دالة لإنشاء رمز JWT
export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  }

  return jwt.sign(payload, process.env.JWT_SECRET || "your_jwt_secret_key_here", {
    expiresIn: "1d", // ينتهي بعد يوم واحد
  })
}

// دالة للتحقق من صحة رمز JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret_key_here")
  } catch (error) {
    return null
  }
}

// دالة للحصول على معلومات المستخدم بواسطة المعرف
export async function getUserById(id) {
  try {
    await connectToDatabase()
    const user = await User.findById(id)
    return user
  } catch (error) {
    console.error("Error getting user by ID:", error)
    return null
  }
}
