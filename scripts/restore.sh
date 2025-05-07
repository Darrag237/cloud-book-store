#!/bin/bash

# سكريبت لاستعادة قاعدة البيانات من نسخة احتياطية

# التحقق من وجود ملف النسخة الاحتياطية
if [ -z "$1" ]; then
    echo "يرجى تحديد ملف النسخة الاحتياطية"
    echo "مثال: ./scripts/restore.sh backups/bookstore_db_20230101_120000.sql"
    exit 1
fi

# التحقق من وجود الملف
if [ ! -f "$1" ]; then
    echo "ملف النسخة الاحتياطية غير موجود: $1"
    exit 1
fi

# استخراج متغيرات البيئة من ملف .env
source .env

# استعادة قاعدة البيانات
cat $1 | docker exec -i bookstore-db psql -U ${DB_USER} -d ${DB_NAME}

echo "تم استعادة قاعدة البيانات بنجاح من: $1"
