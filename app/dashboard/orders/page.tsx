"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MoreVertical, Eye, CheckCircle, XCircle, TruckIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// نموذج بيانات للطلبات
const ordersData = [
  {
    id: "ORD-5523",
    customerId: "c1",
    customerName: "أحمد محمد",
    date: "2023/05/15",
    total: 320,
    status: "pending",
    items: [
      { id: "1", title: "رواية الأمير الصغير", price: 45, quantity: 2, vendorId: "v1" },
      { id: "3", title: "البرمجة بلغة جافاسكريبت", price: 85, quantity: 1, vendorId: "v1" },
      { id: "4", title: "علم النفس الإيجابي", price: 55, quantity: 2, vendorId: "v3" },
    ],
  },
  {
    id: "ORD-5522",
    customerId: "c2",
    customerName: "سارة علي",
    date: "2023/05/14",
    total: 150,
    status: "shipped",
    items: [
      { id: "2", title: "مئة عام من العزلة", price: 60, quantity: 1, vendorId: "v2" },
      { id: "4", title: "علم النفس الإيجابي", price: 55, quantity: 1, vendorId: "v3" },
    ],
  },
  {
    id: "ORD-5521",
    customerId: "c3",
    customerName: "خالد عبدالله",
    date: "2023/05/13",
    total: 420,
    status: "completed",
    items: [
      { id: "1", title: "رواية الأمير الصغير", price: 45, quantity: 2, vendorId: "v1" },
      { id: "2", title: "مئة عام من العزلة", price: 60, quantity: 2, vendorId: "v2" },
      { id: "3", title: "البرمجة بلغة جافاسكريبت", price: 85, quantity: 2, vendorId: "v1" },
    ],
  },
  {
    id: "ORD-5520",
    customerId: "c4",
    customerName: "نورة سعد",
    date: "2023/05/12",
    total: 280,
    status: "completed",
    items: [
      { id: "3", title: "البرمجة بلغة جافاسكريبت", price: 85, quantity: 2, vendorId: "v1" },
      { id: "4", title: "علم النفس الإيجابي", price: 55, quantity: 2, vendorId: "v3" },
    ],
  },
  {
    id: "ORD-5519",
    customerId: "c5",
    customerName: "فهد محمد",
    date: "2023/05/10",
    total: 195,
    status: "completed",
    items: [
      { id: "1", title: "رواية الأمير الصغير", price: 45, quantity: 1, vendorId: "v1" },
      { id: "2", title: "مئة عام من العزلة", price: 60, quantity: 1, vendorId: "v2" },
      { id: "4", title: "علم النفس الإيجابي", price: 55, quantity: 1, vendorId: "v3" },
    ],
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [orders, setOrders] = useState(ordersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newStatus, setNewStatus] = useState("")

  // تصفية الطلبات حسب نوع المستخدم
  const filteredOrders = (() => {
    let filtered = orders

    // تصفية حسب نوع المستخدم
    if (user?.role === "vendor") {
      // عرض الطلبات التي تحتوي على كتب البائع فقط (vendorId: "v1")
      filtered = orders.filter((order) => order.items.some((item) => item.vendorId === "v1"))
    } else if (user?.role === "customer") {
      // عرض طلبات العميل فقط (customerId: "c1" افتراضياً)
      filtered = orders.filter((order) => order.customerId === "c1")
    }

    // تصفية حسب حالة الطلب
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    // البحث
    if (searchTerm) {
      filtered = filtered.filter((order) => order.id.includes(searchTerm) || order.customerName.includes(searchTerm))
    }

    return filtered
  })()

  // تحديث حالة الطلب
  const handleUpdateOrderStatus = () => {
    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id ? { ...order, status: newStatus } : order,
    )

    setOrders(updatedOrders)
    setIsUpdateStatusDialogOpen(false)

    toast({
      title: "تم تحديث الحالة",
      description: `تم تحديث حالة الطلب ${selectedOrder.id} بنجاح`,
    })
  }

  // عرض حالة الطلب بشكل مناسب
  const renderOrderStatus = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            قيد التنفيذ
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            تم الشحن
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            مكتمل
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            ملغي
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">إدارة الطلبات</h1>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن طلب..."
            className="pl-10 rtl:pr-10 rtl:pl-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="pending">قيد التنفيذ</SelectItem>
            <SelectItem value="shipped">تم الشحن</SelectItem>
            <SelectItem value="completed">مكتمل</SelectItem>
            <SelectItem value="cancelled">ملغي</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>رقم الطلب</TableHead>
              <TableHead>العميل</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>المبلغ</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-left rtl:text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total} ر.س</TableCell>
                <TableCell>{renderOrderStatus(order.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">القائمة</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedOrder(order)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                        عرض التفاصيل
                      </DropdownMenuItem>
                      {(user?.role === "admin" || user?.role === "vendor") &&
                        order.status !== "completed" &&
                        order.status !== "cancelled" && (
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedOrder(order)
                              setNewStatus(order.status === "pending" ? "shipped" : "completed")
                              setIsUpdateStatusDialogOpen(true)
                            }}
                          >
                            <CheckCircle className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                            {order.status === "pending" ? "تحديث إلى تم الشحن" : "تحديث إلى مكتمل"}
                          </DropdownMenuItem>
                        )}
                      {(user?.role === "admin" || user?.role === "vendor") &&
                        order.status !== "completed" &&
                        order.status !== "cancelled" && (
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedOrder(order)
                              setNewStatus("cancelled")
                              setIsUpdateStatusDialogOpen(true)
                            }}
                          >
                            <XCircle className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                            إلغاء الطلب
                          </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* نافذة عرض تفاصيل الطلب */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب</DialogTitle>
            <DialogDescription>عرض تفاصيل الطلب والمنتجات المطلوبة</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">معلومات الطلب</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">رقم الطلب:</dt>
                        <dd>{selectedOrder.id}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">التاريخ:</dt>
                        <dd>{selectedOrder.date}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">الحالة:</dt>
                        <dd>{renderOrderStatus(selectedOrder.status)}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">معلومات العميل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">الاسم:</dt>
                        <dd>{selectedOrder.customerName}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">رقم العميل:</dt>
                        <dd>{selectedOrder.customerId}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">المنتجات المطلوبة</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المنتج</TableHead>
                        <TableHead className="text-center">الكمية</TableHead>
                        <TableHead className="text-center">السعر</TableHead>
                        <TableHead className="text-left rtl:text-right">المجموع</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell className="text-center">{item.quantity}</TableCell>
                          <TableCell className="text-center">{item.price} ر.س</TableCell>
                          <TableCell className="text-left rtl:text-right">{item.price * item.quantity} ر.س</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-left rtl:text-right font-bold">
                          المجموع الكلي
                        </TableCell>
                        <TableCell className="text-left rtl:text-right font-bold">{selectedOrder.total} ر.س</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                {selectedOrder.status === "pending" && (user?.role === "admin" || user?.role === "vendor") && (
                  <Button
                    onClick={() => {
                      setNewStatus("shipped")
                      setIsViewDialogOpen(false)
                      setIsUpdateStatusDialogOpen(true)
                    }}
                  >
                    <TruckIcon className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                    تحديث إلى تم الشحن
                  </Button>
                )}
                {selectedOrder.status === "shipped" && (user?.role === "admin" || user?.role === "vendor") && (
                  <Button
                    onClick={() => {
                      setNewStatus("completed")
                      setIsViewDialogOpen(false)
                      setIsUpdateStatusDialogOpen(true)
                    }}
                  >
                    <CheckCircle className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                    تحديث إلى مكتمل
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  إغلاق
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* نافذة تحديث حالة الطلب */}
      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تحديث حالة الطلب</DialogTitle>
            <DialogDescription>هل أنت متأكد من رغبتك في تحديث حالة الطلب؟</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4">
              <p className="mb-4">
                تحديث حالة الطلب <span className="font-bold">{selectedOrder.id}</span> من{" "}
                <span className="font-bold">
                  {selectedOrder.status === "pending"
                    ? "قيد التنفيذ"
                    : selectedOrder.status === "shipped"
                      ? "تم الشحن"
                      : selectedOrder.status === "completed"
                        ? "مكتمل"
                        : "ملغي"}
                </span>{" "}
                إلى{" "}
                <span className="font-bold">
                  {newStatus === "pending"
                    ? "قيد التنفيذ"
                    : newStatus === "shipped"
                      ? "تم الشحن"
                      : newStatus === "completed"
                        ? "مكتمل"
                        : "ملغي"}
                </span>
              </p>
              {newStatus === "cancelled" && (
                <p className="text-red-500 text-sm">ملاحظة: إلغاء الطلب سيؤدي إلى إعادة المنتجات إلى المخزون.</p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStatusDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateOrderStatus}>تأكيد</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
