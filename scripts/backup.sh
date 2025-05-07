#!/bin/bash

# سكريبت لعمل نسخة احتياطية من قاعدة البيانات

# إنشاء مجلد للنسخ الاحتياطية إذا لم يكن موجوداً
mkdir -p backups

# تحديد اسم الملف بناءً على التاريخ والوقت الحاليين
BACKUP_FILE="backups/bookstore_db_$(date +%Y%m%d_%H%M%S).sql"

# استخراج متغيرات البيئة من ملف .env
source .env

# عمل نسخة احتياطية من قاعدة البيانات
docker exec bookstore-db pg_dump -U ${DB_USER} -d ${DB_NAME} > ${BACKUP_FILE}

echo "تم إنشاء نسخة احتياطية بنجاح: ${BACKUP_FILE}"
