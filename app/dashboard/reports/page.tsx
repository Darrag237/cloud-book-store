"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// بيانات المبيعات الشهرية
const monthlySalesData = [
  { name: "يناير", sales: 4000 },
  { name: "فبراير", sales: 3000 },
  { name: "مارس", sales: 2000 },
  { name: "أبريل", sales: 2780 },
  { name: "مايو", sales: 1890 },
  { name: "يونيو", sales: 2390 },
  { name: "يوليو", sales: 3490 },
  { name: "أغسطس", sales: 4000 },
  { name: "سبتمبر", sales: 3200 },
  { name: "أكتوبر", sales: 2800 },
  { name: "نوفمبر", sales: 3300 },
  { name: "ديسمبر", sales: 5000 },
]

// بيانات المبيعات حسب التصنيف
const categorySalesData = [
  { name: "روايات", value: 35 },
  { name: "تقنية", value: 25 },
  { name: "تنمية ذاتية", value: 20 },
  { name: "تسويق", value: 10 },
  { name: "أخرى", value: 10 },
]

// بيانات المبيعات حسب البائع
const vendorSalesData = [
  { name: "بائع 1", sales: 12500 },
  { name: "بائع 2", sales: 8700 },
  { name: "بائع 3", sales: 6800 },
  { name: "بائع 4", sales: 5400 },
  { name: "بائع 5", sales: 4200 },
]

// بيانات المخزون المنخفض
const lowStockData = [
  {
    id: "1",
    title: "رواية الأمير الصغير",
    author: "أنطوان دو سانت إكزوبيري",
    quantity: 5,
    threshold: 10,
    vendorName: "بائع 1",
  },
  {
    id: "2",
    title: "مئة عام من العزلة",
    author: "غابرييل غارسيا ماركيز",
    quantity: 3,
    threshold: 10,
    vendorName: "بائع 2",
  },
  { id: "4", title: "علم النفس الإيجابي", author: "سارة الحسن", quantity: 1, threshold: 5, vendorName: "بائع 3" },
  { id: "5", title: "تعلم التسويق الإلكتروني", author: "فهد العتيبي", quantity: 2, threshold: 8, vendorName: "بائع 1" },
  {
    id: "6",
    title: "الذكاء الاصطناعي للمبتدئين",
    author: "عبدالله العمري",
    quantity: 4,
    threshold: 10,
    vendorName: "بائع 2",
  },
]

// بيانات أكثر الكتب مبيعاً
const topSellingBooksData = [
  { id: "1", title: "رواية الأمير الصغير", author: "أنطوان دو سانت إكزوبيري", sales: 120, vendorName: "بائع 1" },
  { id: "3", title: "البرمجة بلغة جافاسكريبت", author: "محمد أحمد", sales: 95, vendorName: "بائع 1" },
  { id: "2", title: "مئة عام من العزلة", author: "غابرييل غارسيا ماركيز", sales: 80, vendorName: "بائع 2" },
  { id: "4", title: "علم النفس الإيجابي", author: "سارة الحسن", sales: 65, vendorName: "بائع 3" },
  { id: "6", title: "الذكاء الاصطناعي للمبتدئين", author: "عبدالله العمري", sales: 50, vendorName: "بائع 2" },
]

// ألوان للرسم البياني الدائري
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function ReportsPage() {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState("year")

  // تصفية البيانات حسب نوع المستخدم
  const filteredVendorSalesData =
    user?.role === "vendor"
      ? [vendorSalesData[0]] // افتراضياً نعرض بيانات البائع الأول فقط
      : vendorSalesData

  const filteredTopSellingBooks =
    user?.role === "vendor"
      ? topSellingBooksData.filter((book) => book.vendorName === "بائع 1") // افتراضياً نعرض كتب البائع الأول فقط
      : topSellingBooksData

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">التقارير</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="الفترة الزمنية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">الشهر الحالي</SelectItem>
            <SelectItem value="quarter">الربع الحالي</SelectItem>
            <SelectItem value="year">السنة الحالية</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* تقرير المبيعات الشهرية */}
      <Card>
        <CardHeader>
          <CardTitle>المبيعات الشهرية</CardTitle>
          <CardDescription>إجمالي المبيعات لكل شهر خلال السنة الحالية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlySalesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" name="المبيعات (ر.س)" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* تقرير المبيعات حسب التصنيف */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المبيعات حسب التصنيف</CardTitle>
            <CardDescription>توزيع المبيعات على التصنيفات المختلفة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {user?.role === "admin" && (
          <Card>
            <CardHeader>
              <CardTitle>المبيعات حسب البائع</CardTitle>
              <CardDescription>إجمالي المبيعات لكل بائع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredVendorSalesData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" name="المبيعات (ر.س)" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* تقرير أكثر الكتب مبيعاً */}
      <Card>
        <CardHeader>
          <CardTitle>أكثر الكتب مبيعاً</CardTitle>
          <CardDescription>الكتب الأكثر مبيعاً خلال الفترة المحددة</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead>المؤلف</TableHead>
                {user?.role === "admin" && <TableHead>البائع</TableHead>}
                <TableHead className="text-left rtl:text-right">المبيعات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTopSellingBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  {user?.role === "admin" && <TableCell>{book.vendorName}</TableCell>}
                  <TableCell className="text-left rtl:text-right">{book.sales} نسخة</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* تقرير المخزون المنخفض */}
      {(user?.role === "admin" || user?.role === "storekeeper" || user?.role === "vendor") && (
        <Card>
          <CardHeader>
            <CardTitle>المخزون المنخفض</CardTitle>
            <CardDescription>الكتب التي وصلت إلى الحد الأدنى للمخزون أو أقل</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العنوان</TableHead>
                  <TableHead>المؤلف</TableHead>
                  {user?.role === "admin" && <TableHead>البائع</TableHead>}
                  <TableHead className="text-center">الكمية الحالية</TableHead>
                  <TableHead className="text-center">الحد الأدنى</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockData
                  .filter((book) => user?.role !== "vendor" || book.vendorName === "بائع 1")
                  .map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      {user?.role === "admin" && <TableCell>{book.vendorName}</TableCell>}
                      <TableCell className="text-center text-red-500 font-bold">{book.quantity}</TableCell>
                      <TableCell className="text-center">{book.threshold}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
