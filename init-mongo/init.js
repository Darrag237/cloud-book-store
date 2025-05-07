// سكريبت تهيئة قاعدة بيانات MongoDB
var db
db = db.getSiblingDB("bookstore")

// إنشاء المستخدمين
db.users.insertMany([
  {
    name: "مدير النظام",
    email: "admin@example.com",
    // كلمة المرور: password
    password: "$2a$10$1XpzxM7XY3KEDYJbAZRA/OcJQrlCyexQOQjy1ZZDl.YnXcJxJ3vIi",
    role: "admin",
    status: "active",
    createdAt: new Date(),
  },
  {
    name: "بائع كتب",
    email: "vendor@example.com",
    // كلمة المرور: password
    password: "$2a$10$1XpzxM7XY3KEDYJbAZRA/OcJQrlCyexQOQjy1ZZDl.YnXcJxJ3vIi",
    role: "vendor",
    status: "active",
    createdAt: new Date(),
  },
  {
    name: "عميل",
    email: "customer@example.com",
    // كلمة المرور: password
    password: "$2a$10$1XpzxM7XY3KEDYJbAZRA/OcJQrlCyexQOQjy1ZZDl.YnXcJxJ3vIi",
    role: "customer",
    status: "active",
    createdAt: new Date(),
  },
  {
    name: "أمين المخزن",
    email: "store@example.com",
    // كلمة المرور: password
    password: "$2a$10$1XpzxM7XY3KEDYJbAZRA/OcJQrlCyexQOQjy1ZZDl.YnXcJxJ3vIi",
    role: "storekeeper",
    status: "active",
    createdAt: new Date(),
  },
])

// الحصول على معرفات المستخدمين
const adminId = db.users.findOne({ email: "admin@example.com" })._id
const vendorId = db.users.findOne({ email: "vendor@example.com" })._id
const customerId = db.users.findOne({ email: "customer@example.com" })._id

// إنشاء الكتب
db.books.insertMany([
  {
    title: "رواية الأمير الصغير",
    author: "أنطوان دو سانت إكزوبيري",
    price: 45,
    image: "/placeholder.svg?height=300&width=200",
    category: "روايات",
    quantity: 25,
    vendorId: vendorId,
    description:
      "رواية فلسفية للكاتب الفرنسي أنطوان دو سانت إكزوبيري، تحكي قصة طيار تعطلت طائرته في الصحراء ويلتقي بأمير صغير من كوكب آخر.",
    publishDate: "1943",
    pages: 96,
    language: "العربية",
    isbn: "9789776171718",
    threshold: 10,
    lastUpdated: new Date(),
  },
  {
    title: "مئة عام من العزلة",
    author: "غابرييل غارسيا ماركيز",
    price: 60,
    image: "/placeholder.svg?height=300&width=200",
    category: "روايات",
    quantity: 15,
    vendorId: vendorId,
    description: "رواية ملحمية تحكي قصة عائلة بوينديا على مدى سبعة أجيال في قرية ماكوندو الخيالية.",
    publishDate: "1967",
    pages: 417,
    language: "العربية",
    isbn: "9789776180085",
    threshold: 10,
    lastUpdated: new Date(),
  },
  {
    title: "البرمجة بلغة جافاسكريبت",
    author: "محمد أحمد",
    price: 85,
    image: "/placeholder.svg?height=300&width=200",
    category: "تقنية",
    quantity: 30,
    vendorId: vendorId,
    description: "كتاب شامل لتعلم لغة البرمجة جافاسكريبت من الصفر حتى الاحتراف.",
    publishDate: "2022",
    pages: 450,
    language: "العربية",
    isbn: "9789776180092",
    threshold: 15,
    lastUpdated: new Date(),
  },
  {
    title: "علم النفس الإيجابي",
    author: "سارة الحسن",
    price: 55,
    image: "/placeholder.svg?height=300&width=200",
    category: "تنمية ذاتية",
    quantity: 20,
    vendorId: vendorId,
    description: "كتاب يشرح مبادئ علم النفس الإيجابي وكيفية تطبيقها في الحياة اليومية.",
    publishDate: "2021",
    pages: 320,
    language: "العربية",
    isbn: "9789776180108",
    threshold: 5,
    lastUpdated: new Date(),
  },
])

// الحصول على معرفات الكتب
const book1 = db.books.findOne({ title: "رواية الأمير الصغير" })._id
const book2 = db.books.findOne({ title: "مئة عام من العزلة" })._id
const book3 = db.books.findOne({ title: "البرمجة بلغة جافاسكريبت" })._id
const book4 = db.books.findOne({ title: "علم النفس الإيجابي" })._id

// إنشاء الطلبات
const order1 = db.orders.insertOne({
  customerId: customerId,
  items: [
    { bookId: book1, quantity: 2, price: 45 },
    { bookId: book3, quantity: 1, price: 85 },
    { bookId: book4, quantity: 2, price: 55 },
  ],
  total: 320,
  status: "pending",
  date: new Date(),
})

const order2 = db.orders.insertOne({
  customerId: customerId,
  items: [
    { bookId: book2, quantity: 1, price: 60 },
    { bookId: book4, quantity: 1, price: 55 },
  ],
  total: 150,
  status: "shipped",
  date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // قبل يومين
})

const order3 = db.orders.insertOne({
  customerId: customerId,
  items: [
    { bookId: book1, quantity: 2, price: 45 },
    { bookId: book2, quantity: 2, price: 60 },
    { bookId: book3, quantity: 2, price: 85 },
  ],
  total: 420,
  status: "completed",
  date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // قبل 5 أيام
})

// إنشاء التقييمات
db.reviews.insertMany([
  {
    bookId: book1,
    userId: customerId,
    rating: 5,
    comment: "من أجمل الروايات التي قرأتها، أنصح بها بشدة.",
    date: new Date(),
  },
  {
    bookId: book1,
    userId: customerId,
    rating: 4,
    comment: "رواية جميلة ومؤثرة، استمتعت بقراءتها كثيراً.",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // قبل 10 أيام
  },
  {
    bookId: book2,
    userId: customerId,
    rating: 5,
    comment: "تحفة أدبية حقيقية، من أفضل ما قرأت في حياتي.",
    date: new Date(),
  },
  {
    bookId: book3,
    userId: customerId,
    rating: 5,
    comment: "كتاب رائع للمبتدئين في عالم البرمجة، شرح مبسط وأمثلة عملية.",
    date: new Date(),
  },
])

print("تم تهيئة قاعدة البيانات بنجاح!")
