import { connectToDatabase } from "@/components/lib/db"
import User from "@/components/lib/models/User"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  try {
    const { id } = params

    await connectToDatabase()
    const user = await User.findById(id).select("-password")

    if (!user) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء جلب المستخدم" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { name, email, role, status } = await request.json()

    if (!name || !email || !role || !status) {
      return NextResponse.json({ error: "جميع الحقول المطلوبة غير مكتملة" }, { status: 400 })
    }

    await connectToDatabase()

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, status },
      { new: true, runValidators: true },
    ).select("-password")

    if (!updatedUser) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء تحديث المستخدم" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params

    await connectToDatabase()
    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 })
    }

    return NextResponse.json({ message: "تم حذف المستخدم بنجاح" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء حذف المستخدم" }, { status: 500 })
  }
}
