#!/bin/bash

# سكريبت لنشر التطبيق باستخدام Docker Compose

# التأكد من وجود ملف .env
if [ ! -f .env ]; then
    echo "ملف .env غير موجود. يرجى إنشاء ملف .env باستخدام .env.example كقالب."
    exit 1
fi

# إنشاء مجلدات Nginx إذا لم تكن موجودة
mkdir -p nginx/conf.d nginx/ssl nginx/logs

# إيقاف الحاويات القديمة (إذا وجدت)
docker-compose down

# بناء وتشغيل الحاويات الجديدة
docker-compose up -d --build

echo "تم نشر التطبيق بنجاح!"
echo "يمكنك الوصول إلى التطبيق على http://localhost"
