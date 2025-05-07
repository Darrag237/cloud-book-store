import mongoose from "mongoose"
import bcrypt from "bcryptjs"

// تعريف مخطط المستخدم
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "الاسم مطلوب"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "البريد الإلكتروني مطلوب"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "كلمة المرور مطلوبة"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "vendor", "customer", "storekeeper"],
    default: "customer",
  },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// دالة قبل الحفظ لتشفير كلمة المرور
userSchema.pre("save", async function (next) {
  // فقط إذا تم تعديل كلمة المرور
  if (!this.isModified("password")) return next()

  try {
    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// دالة للتحقق من صحة كلمة المرور
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

// إنشاء النموذج إذا لم يكن موجوداً
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
