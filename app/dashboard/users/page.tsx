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
import { Label } from "@/components/ui/label"
import { Search, Plus, MoreVertical, Pencil, Trash2, UserCheck, UserX } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

// نموذج بيانات للمستخدمين
const usersData = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    role: "admin",
    status: "active",
    createdAt: "2023/01/15",
  },
  {
    id: "2",
    name: "سارة علي",
    email: "sara@example.com",
    role: "vendor",
    status: "active",
    createdAt: "2023/02/20",
  },
  {
    id: "3",
    name: "خالد عبدالله",
    email: "khaled@example.com",
    role: "customer",
    status: "active",
    createdAt: "2023/03/10",
  },
  {
    id: "4",
    name: "نورة سعد",
    email: "noura@example.com",
    role: "customer",
    status: "inactive",
    createdAt: "2023/03/15",
  },
  {
    id: "5",
    name: "فهد محمد",
    email: "fahad@example.com",
    role: "storekeeper",
    status: "active",
    createdAt: "2023/04/05",
  },
  {
    id: "6",
    name: "ليلى عمر",
    email: "layla@example.com",
    role: "vendor",
    status: "pending",
    createdAt: "2023/05/01",
  },
]

export default function UsersPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState(usersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // نموذج بيانات للمستخدم الجديد
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    status: "active",
  })

  // التحقق من صلاحيات المستخدم
  if (user?.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <h1 className="text-2xl font-bold mb-4">غير مصرح</h1>
        <p className="text-muted-foreground">ليس لديك صلاحية للوصول إلى هذه الصفحة</p>
      </div>
    )
  }

  // تصفية المستخدمين
  const filteredUsers = (() => {
    let filtered = users

    // تصفية حسب الدور
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter)
    }

    // تصفية حسب الحالة
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    // البحث
    if (searchTerm) {
      filtered = filtered.filter((user) => user.name.includes(searchTerm) || user.email.includes(searchTerm))
    }

    return filtered
  })()

  // إضافة مستخدم جديد
  const handleAddUser = () => {
    const userId = Math.random().toString(36).substr(2, 9)
    const newUserWithId = {
      ...newUser,
      id: userId,
      createdAt: new Date().toISOString().split("T")[0].replace(/-/g, "/"),
    }

    setUsers([...users, newUserWithId])
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "customer",
      status: "active",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "تمت الإضافة بنجاح",
      description: "تم إضافة المستخدم الجديد بنجاح",
    })
  }

  // تحديث مستخدم
  const handleUpdateUser = () => {
    const updatedUsers = users.map((user) => (user.id === selectedUser.id ? selectedUser : user))

    setUsers(updatedUsers)
    setIsEditDialogOpen(false)

    toast({
      title: "تم التحديث بنجاح",
      description: "تم تحديث بيانات المستخدم بنجاح",
    })
  }

  // حذف مستخدم
  const handleDeleteUser = () => {
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id)

    setUsers(updatedUsers)
    setIsDeleteDialogOpen(false)

    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف المستخدم بنجاح",
    })
  }

  // تغيير حالة المستخدم
  const handleToggleUserStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    const updatedUsers = users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user))

    setUsers(updatedUsers)

    toast({
      title: "تم تحديث الحالة",
      description: `تم تغيير حالة المستخدم إلى ${newStatus === "active" ? "نشط" : "غير نشط"}`,
    })
  }

  // عرض حالة المستخدم بشكل مناسب
  const renderUserStatus = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            نشط
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            غير نشط
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            معلق
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // عرض دور المستخدم بشكل مناسب
  const renderUserRole = (role) => {
    switch (role) {
      case "admin":
        return "مدير النظام"
      case "vendor":
        return "بائع"
      case "customer":
        return "عميل"
      case "storekeeper":
        return "أمين مخزن"
      default:
        return role
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">إدارة المستخدمين</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
          إضافة مستخدم جديد
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث عن مستخدم..."
            className="pl-10 rtl:pr-10 rtl:pl-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الدور" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأدوار</SelectItem>
              <SelectItem value="admin">مدير النظام</SelectItem>
              <SelectItem value="vendor">بائع</SelectItem>
              <SelectItem value="customer">عميل</SelectItem>
              <SelectItem value="storekeeper">أمين مخزن</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
              <SelectItem value="pending">معلق</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الاسم</TableHead>
              <TableHead>البريد الإلكتروني</TableHead>
              <TableHead>الدور</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>تاريخ الإنشاء</TableHead>
              <TableHead className="text-left rtl:text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{renderUserRole(user.role)}</TableCell>
                <TableCell>{renderUserStatus(user.status)}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
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
                          setSelectedUser(user)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                        تعديل
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                        حذف
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id, user.status)}>
                        {user.status === "active" ? (
                          <>
                            <UserX className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                            تعطيل
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />
                            تفعيل
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* نافذة إضافة مستخدم جديد */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
            <DialogDescription>أدخل بيانات المستخدم الجديد هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                الاسم
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                كلمة المرور
              </Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                الدور
              </Label>
              <select
                id="role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="admin">مدير النظام</option>
                <option value="vendor">بائع</option>
                <option value="customer">عميل</option>
                <option value="storekeeper">أمين مخزن</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                الحالة
              </Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="pending">معلق</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddUser}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة تعديل مستخدم */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل مستخدم</DialogTitle>
            <DialogDescription>قم بتعديل بيانات المستخدم هنا. اضغط على حفظ عند الانتهاء.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  الاسم
                </Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  الدور
                </Label>
                <select
                  id="edit-role"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                >
                  <option value="admin">مدير النظام</option>
                  <option value="vendor">بائع</option>
                  <option value="customer">عميل</option>
                  <option value="storekeeper">أمين مخزن</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  الحالة
                </Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3"
                  value={selectedUser.status}
                  onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                >
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                  <option value="pending">معلق</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateUser}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة تأكيد الحذف */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <p>
                أنت على وشك حذف المستخدم: <span className="font-bold">{selectedUser.name}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">البريد الإلكتروني: {selectedUser.email}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
