#!/bin/bash

# سكريبت لبدء المشروع باستخدام Docker Compose

# التأكد من وجود Docker و Docker Compose
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null; then
    echo "يرجى تثبيت Docker و Docker Compose أولاً"
    exit 1
fi

# إنشاء ملف .env إذا لم يكن موجوداً
if [ ! -f .env ]; then
    cp .env.example .env 2>/dev/null || echo "# متغيرات بيئية للتطبيق
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key_here

# متغيرات قاعدة بيانات MongoDB
MONGODB_URI=mongodb://admin:password@mongo:27017/bookstore?authSource=admin
MONGO_USER=admin
MONGO_PASSWORD=password
MONGO_DB=bookstore" > .env
    echo "تم إنشاء ملف .env"
fi

# إنشاء مجلد init-mongo إذا لم يكن موجوداً
mkdir -p init-mongo

# التحقق من وجود ملف init.js
if [ ! -f init-mongo/init.js ]; then
    echo "ملف init.js غير موجود في مجلد init-mongo"
    echo "يرجى التأكد من وجود الملف init.js"
    exit 1
fi

# التحقق من وجود ملف package.json
if [ ! -f package.json ]; then
    echo "ملف package.json غير موجود"
    echo "يرجى التأكد من وجود ملف package.json"
    exit 1
fi

# بناء وتشغيل الحاويات
echo "جاري بناء وتشغيل المشروع..."
docker-compose down
docker-compose up -d --build

# انتظار بدء تشغيل قاعدة البيانات
echo "جاري انتظار بدء تشغيل قاعدة البيانات..."
sleep 10

echo "تم بدء المشروع بنجاح!"
echo "يمكنك الوصول إلى التطبيق على http://localhost:3000"
echo "للوصول إلى قاعدة البيانات: localhost:27017"
echo "اسم المستخدم: admin"
echo "كلمة المرور: password"
echo "اسم قاعدة البيانات: bookstore"
echo ""
echo "بيانات تسجيل الدخول للتطبيق:"
echo "مدير النظام: admin@example.com / password"
echo "بائع: vendor@example.com / password"
echo "عميل: customer@example.com / password"
echo "أمين مخزن: store@example.com / password"
