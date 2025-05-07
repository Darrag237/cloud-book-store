"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ShoppingCart, Users, Package, TrendingUp, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">مرحباً، {user?.name}</h1>
        <p className="text-muted-foreground">هذه هي لوحة التحكم الخاصة بك في نظام إدارة متجر الكتب</p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* عرض البطاقات حسب نوع المستخدم */}
        {(user?.role === "admin" || user?.role === "vendor") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المبيعات</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,500 ر.س</div>
              <p className="text-xs text-muted-foreground">+18% مقارنة بالشهر الماضي</p>
            </CardContent>
          </Card>
        )}

        {(user?.role === "admin" || user?.role === "vendor" || user?.role === "customer") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الطلبات</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {user?.role === "admin" ? "245" : user?.role === "vendor" ? "120" : "5"}
              </div>
              <p className="text-xs text-muted-foreground">
                {user?.role === "customer" ? "منها 2 قيد التنفيذ" : "+12% مقارنة بالشهر الماضي"}
              </p>
            </CardContent>
          </Card>
        )}

        {(user?.role === "admin" || user?.role === "vendor" || user?.role === "storekeeper") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">الكتب</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.role === "admin" ? "1,245" : "320"}</div>
              <p className="text-xs text-muted-foreground">
                {user?.role === "admin" ? "من 24 بائع" : "+8 كتب جديدة هذا الأسبوع"}
              </p>
            </CardContent>
          </Card>
        )}

        {user?.role === "admin" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المستخدمين</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,456</div>
              <p className="text-xs text-muted-foreground">+7% مقارنة بالشهر الماضي</p>
            </CardContent>
          </Card>
        )}

        {(user?.role === "storekeeper" || user?.role === "admin" || user?.role === "vendor") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المخزون المنخفض</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">كتب بحاجة إلى تجديد المخزون</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* محتوى مخصص حسب نوع المستخدم */}
      {user?.role === "admin" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>أحدث الطلبات</CardTitle>
              <CardDescription>آخر 5 طلبات تم استلامها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5523</p>
                    <p className="text-sm text-muted-foreground">أحمد محمد</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">320 ر.س</p>
                    <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5522</p>
                    <p className="text-sm text-muted-foreground">سارة علي</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">150 ر.س</p>
                    <p className="text-sm text-muted-foreground">تم الشحن</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5521</p>
                    <p className="text-sm text-muted-foreground">خالد عبدالله</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">420 ر.س</p>
                    <p className="text-sm text-muted-foreground">مكتمل</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5520</p>
                    <p className="text-sm text-muted-foreground">نورة سعد</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">280 ر.س</p>
                    <p className="text-sm text-muted-foreground">مكتمل</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">#ORD-5519</p>
                    <p className="text-sm text-muted-foreground">فهد محمد</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">195 ر.س</p>
                    <p className="text-sm text-muted-foreground">مكتمل</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>أكثر الكتب مبيعاً</CardTitle>
              <CardDescription>الكتب الأكثر مبيعاً هذا الشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">رواية الأمير الصغير</p>
                      <p className="text-sm text-muted-foreground">أنطوان دو سانت إكزوبيري</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">120 نسخة</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">البرمجة بلغة جافاسكريبت</p>
                      <p className="text-sm text-muted-foreground">محمد أحمد</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">95 نسخة</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">مئة عام من العزلة</p>
                      <p className="text-sm text-muted-foreground">غابرييل غارسيا ماركيز</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">80 نسخة</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">علم النفس الإيجابي</p>
                      <p className="text-sm text-muted-foreground">سارة الحسن</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">65 نسخة</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">الذكاء الاصطناعي للمبتدئين</p>
                      <p className="text-sm text-muted-foreground">عبدالله العمري</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">50 نسخة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {user?.role === "vendor" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>أحدث الطلبات على كتبك</CardTitle>
              <CardDescription>آخر 5 طلبات لكتبك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5523</p>
                    <p className="text-sm text-muted-foreground">رواية الأمير الصغير</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">45 ر.س</p>
                    <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5520</p>
                    <p className="text-sm text-muted-foreground">البرمجة بلغة جافاسكريبت</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">85 ر.س</p>
                    <p className="text-sm text-muted-foreground">تم الشحن</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5518</p>
                    <p className="text-sm text-muted-foreground">رواية الأمير الصغير</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">45 ر.س</p>
                    <p className="text-sm text-muted-foreground">مكتمل</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5515</p>
                    <p className="text-sm text-muted-foreground">البرمجة بلغة جافاسكريبت</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">85 ر.س</p>
                    <p className="text-sm text-muted-foreground">مكتمل</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">#ORD-5510</p>
                    <p className="text-sm text-muted-foreground">رواية الأمير الصغير</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">45 ر.س</p>
                    <p className="text-sm text-muted-foreground">مكتمل</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>كتبك الأكثر مبيعاً</CardTitle>
              <CardDescription>الكتب الأكثر مبيعاً هذا الشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">رواية الأمير الصغير</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">120 نسخة</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">البرمجة بلغة جافاسكريبت</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">95 نسخة</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">الذكاء الاصطناعي للمبتدئين</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">50 نسخة</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {user?.role === "customer" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>طلباتك الأخيرة</CardTitle>
              <CardDescription>آخر 5 طلبات قمت بها</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5523</p>
                    <p className="text-sm text-muted-foreground">2023/05/15</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">320 ر.س</p>
                    <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5510</p>
                    <p className="text-sm text-muted-foreground">2023/05/10</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">150 ر.س</p>
                    <p className="text-sm text-muted-foreground">تم الشحن</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5498</p>
                    <p className="text-sm text-muted-foreground">2023/05/01</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">420 ر.س</p>
                    <p className="text-sm text-muted-foreground">مكتمل</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">#ORD-5480</p>
                    <p className="text-sm text-muted-foreground">2023/04/20</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">280 ر.س</p>
                    <p className="text-sm text-muted-foreground">مكتمل</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">#ORD-5465</p>
                    <p className="text-sm text-muted-foreground">2023/04/15</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">195 ر.س</p>
                    <p className="text-sm text-muted-foreground">مكتمل</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>كتب قد تعجبك</CardTitle>
              <CardDescription>بناءً على مشترياتك السابقة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">رواية الأمير الصغير</p>
                      <p className="text-sm text-muted-foreground">أنطوان دو سانت إكزوبيري</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">45 ر.س</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">البرمجة بلغة جافاسكريبت</p>
                      <p className="text-sm text-muted-foreground">محمد أحمد</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">85 ر.س</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">علم النفس الإيجابي</p>
                      <p className="text-sm text-muted-foreground">سارة الحسن</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">55 ر.س</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">الذكاء الاصطناعي للمبتدئين</p>
                      <p className="text-sm text-muted-foreground">عبدالله العمري</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">70 ر.س</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {user?.role === "storekeeper" && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>تنبيهات المخزون المنخفض</CardTitle>
              <CardDescription>كتب بحاجة إلى تجديد المخزون</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">رواية الأمير الصغير</p>
                      <p className="text-sm text-muted-foreground">أنطوان دو سانت إكزوبيري</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-500">5 نسخ متبقية</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">مئة عام من العزلة</p>
                      <p className="text-sm text-muted-foreground">غابرييل غارسيا ماركيز</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-500">3 نسخ متبقية</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">علم النفس الإيجابي</p>
                      <p className="text-sm text-muted-foreground">سارة الحسن</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-500">1 نسخة متبقية</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">الذكاء الاصطناعي للمبتدئين</p>
                      <p className="text-sm text-muted-foreground">عبدالله العمري</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-500">4 نسخ متبقية</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">تعلم التسويق الإلكتروني</p>
                      <p className="text-sm text-muted-foreground">فهد العتيبي</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-500">2 نسخة متبقية</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>حركة المخزون</CardTitle>
              <CardDescription>آخر تحديثات المخزون</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">رواية الأمير الصغير</p>
                      <p className="text-sm text-muted-foreground">2023/05/15</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-500">-3 نسخ</p>
                    <p className="text-sm text-muted-foreground">طلب #ORD-5523</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">البرمجة بلغة جافاسكريبت</p>
                      <p className="text-sm text-muted-foreground">2023/05/14</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-500">+20 نسخة</p>
                    <p className="text-sm text-muted-foreground">إعادة تخزين</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">مئة عام من العزلة</p>
                      <p className="text-sm text-muted-foreground">2023/05/13</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-500">-2 نسخ</p>
                    <p className="text-sm text-muted-foreground">طلب #ORD-5520</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">علم النفس الإيجابي</p>
                      <p className="text-sm text-muted-foreground">2023/05/12</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-red-500">-1 نسخة</p>
                    <p className="text-sm text-muted-foreground">طلب #ORD-5518</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">الذكاء الاصطناعي للمبتدئين</p>
                      <p className="text-sm text-muted-foreground">2023/05/10</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-500">+15 نسخة</p>
                    <p className="text-sm text-muted-foreground">إعادة تخزين</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
