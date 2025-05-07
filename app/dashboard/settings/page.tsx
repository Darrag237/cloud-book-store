"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  // حالة بيانات الملف الشخصي
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "0512345678",
    bio: "نبذة مختصرة عن المستخدم تظهر هنا.",
  })

  // حالة بيانات الأمان
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // حالة إعدادات الإشعارات
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    newProducts: true,
    marketingEmails: false,
  })

  // حفظ بيانات الملف الشخصي
  const handleSaveProfile = () => {
    // في التطبيق الحقيقي، هنا سيتم إرسال البيانات للخادم
    toast({
      title: "تم الحفظ",
      description: "تم تحديث بيانات الملف الشخصي بنجاح",
    })
  }

  // تغيير كلمة المرور
  const handleChangePassword = () => {
    // التحقق من تطابق كلمة المرور الجديدة مع التأكيد
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
        variant: "destructive",
      })
      return
    }

    // في التطبيق الحقيقي، هنا سيتم إرسال البيانات للخادم
    toast({
      title: "تم التغيير",
      description: "تم تغيير كلمة المرور بنجاح",
    })

    // إعادة تعيين الحقول
    setSecurityData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // حفظ إعدادات الإشعارات
  const handleSaveNotificationSettings = () => {
    // في التطبيق الحقيقي، هنا سيتم إرسال البيانات للخادم
    toast({
      title: "تم الحفظ",
      description: "تم تحديث إعدادات الإشعارات بنجاح",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">الإعدادات</h1>
        <p className="text-muted-foreground">إدارة حسابك وتفضيلاتك</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
        </TabsList>

        {/* إعدادات الملف الشخصي */}
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>الملف الشخصي</CardTitle>
              <CardDescription>قم بتحديث معلومات ملفك الشخصي هنا.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">نبذة مختصرة</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveProfile}>حفظ التغييرات</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معلومات الحساب</CardTitle>
              <CardDescription>معلومات أساسية عن حسابك.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">نوع الحساب</p>
                  <p className="text-sm text-muted-foreground">
                    {user?.role === "admin" && "مدير النظام"}
                    {user?.role === "vendor" && "بائع"}
                    {user?.role === "customer" && "عميل"}
                    {user?.role === "storekeeper" && "أمين مخزن"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">تاريخ الانضمام</p>
                  <p className="text-sm text-muted-foreground">15 يناير 2023</p>
                </div>
                <div>
                  <p className="text-sm font-medium">حالة الحساب</p>
                  <p className="text-sm text-muted-foreground">نشط</p>
                </div>
                <div>
                  <p className="text-sm font-medium">آخر تسجيل دخول</p>
                  <p className="text-sm text-muted-foreground">اليوم، {new Date().toLocaleTimeString("ar-SA")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* إعدادات الأمان */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>تغيير كلمة المرور</CardTitle>
              <CardDescription>قم بتحديث كلمة المرور الخاصة بك هنا.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={securityData.currentPassword}
                  onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={securityData.newPassword}
                  onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور الجديدة</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleChangePassword}>تغيير كلمة المرور</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>جلسات تسجيل الدخول</CardTitle>
              <CardDescription>إدارة جلسات تسجيل الدخول النشطة على حسابك.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">هذا الجهاز</p>
                    <p className="text-sm text-muted-foreground">Windows • Chrome • الرياض، المملكة العربية السعودية</p>
                    <p className="text-xs text-muted-foreground">آخر نشاط: الآن</p>
                  </div>
                  <Button variant="outline" size="sm">
                    نشط
                  </Button>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">جهاز آخر</p>
                    <p className="text-sm text-muted-foreground">iOS • Safari • جدة، المملكة العربية السعودية</p>
                    <p className="text-xs text-muted-foreground">آخر نشاط: منذ 2 ساعة</p>
                  </div>
                  <Button variant="outline" size="sm">
                    إنهاء الجلسة
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">إنهاء جميع الجلسات الأخرى</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* إعدادات الإشعارات */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>قم بتخصيص كيفية تلقي الإشعارات.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
                  <p className="text-sm text-muted-foreground">تلقي إشعارات عبر البريد الإلكتروني</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="order-updates">تحديثات الطلبات</Label>
                  <p className="text-sm text-muted-foreground">تلقي إشعارات عند تحديث حالة طلباتك</p>
                </div>
                <Switch
                  id="order-updates"
                  checked={notificationSettings.orderUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, orderUpdates: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-products">منتجات جديدة</Label>
                  <p className="text-sm text-muted-foreground">تلقي إشعارات عند إضافة منتجات جديدة</p>
                </div>
                <Switch
                  id="new-products"
                  checked={notificationSettings.newProducts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, newProducts: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">رسائل تسويقية</Label>
                  <p className="text-sm text-muted-foreground">تلقي رسائل تسويقية وعروض خاصة</p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>حفظ الإعدادات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
