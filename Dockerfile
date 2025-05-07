# استخدام صورة Node.js الرسمية كأساس
FROM node:18-alpine AS base

# تثبيت المتطلبات الأساسية
RUN apk add --no-cache libc6-compat
WORKDIR /app

# مرحلة التبعيات: تثبيت جميع التبعيات
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# مرحلة البناء: بناء التطبيق
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# بناء التطبيق
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# مرحلة الإنتاج: تشغيل التطبيق
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# نسخ الملفات اللازمة
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# تعريض المنفذ 3000
EXPOSE 3000

# تشغيل التطبيق
CMD ["npm", "run", "start"]
