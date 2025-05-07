import { connectToDatabase } from "@/components/lib/db"
import User from "@/components/lib/models/User"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase()
    const users = await User.find().select("-password").sort("name")

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب المستخدمين" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "جميع الحقول المطلوبة غير مكتملة" }, { status: 400 })
    }

    await connectToDatabase()

    // التحقق من وجود البريد الإلكتروني
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json({ error: "البريد الإلكتروني مستخدم بالفعل" }, { status: 400 })
    }

    // إنشاء مستخدم جديد
    const newUser = new User({
      name,
      email,
      password,
      role,
      status: "active",
    })

    await newUser.save()

    // إرجاع بيانات المستخدم بدون كلمة المرور
    const userObject = newUser.toObject()
    delete userObject.password

    return NextResponse.json(userObject)
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء إنشاء المستخدم" }, { status: 500 })
  }
}
