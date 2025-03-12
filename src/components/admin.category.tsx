"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MultiSelect } from "@/components/ui/multi-select"
import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

// Mock data structure
interface Category {
  id: string
  name: string
  description: string
  slug: string
  parentIds: string[]
  level?: number // For display purposes
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Tin tức AI",
    description: "Tin tức về AI",
    slug: "tin-tuc-ai",
    parentIds: [],
  },
  {
    id: "2",
    name: "Ứng dụng AI",
    description: "Các ứng dụng AI",
    slug: "ung-dung-ai",
    parentIds: ["1"],
  },
  {
    id: "3",
    name: "Nhận diện AI",
    description: "Công nghệ nhận diện AI",
    slug: "nhan-dien-ai",
    parentIds: ["2"],
  },
  {
    id: "4",
    name: "Tài chính",
    description: "Thông tin tài chính",
    slug: "tai-chinh",
    parentIds: [],
  },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    parentIds: [] as string[],
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  // Tạo slug từ tên
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if category with same name already exists
    const nameExists = categories.some((cat) => cat.name.toLowerCase() === formData.name.toLowerCase())

    // Check if category with same slug already exists
    const slugExists = categories.some((cat) => cat.slug === formData.slug)

    if (nameExists) {
      toast( "Danh mục với tên này đã tồn tại")
      return
    }

    if (slugExists) {
      toast("Danh mục với đường dẫn này đã tồn tại")
      return
    }

    const newCategory: Category = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
    }
    setCategories([...categories, newCategory])
    setFormData({
      name: "",
      description: "",
      slug: "",
      parentIds: [],
    })

    toast("Đã thêm danh mục mới")
  }

  // Handle delete category
  const handleDeleteClick = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (categoryToDelete) {
      // Check if any categories have this as a parent
      const hasChildren = categories.some((cat) => cat.parentIds.includes(categoryToDelete))

      if (hasChildren) {
        toast("Danh mục này đang được sử dụng làm danh mục cha. Vui lòng xóa các danh mục con trước.")
      } else {
        // Remove the category
        setCategories(categories.filter((cat) => cat.id !== categoryToDelete))
        toast("Danh mục đã được xóa thành công")
      }

      setCategoryToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  // Organize categories into a hierarchical structure
  const organizeCategories = (cats: Category[]) => {
    const result: Category[] = []
    const visited = new Set<string>()

    const addCategoryWithLevel = (category: Category, level: number) => {
      if (!visited.has(category.id)) {
        visited.add(category.id)
        result.push({ ...category, level })

        // Find and add children
        cats
          .filter((cat) => cat.parentIds.includes(category.id))
          .forEach((child) => addCategoryWithLevel(child, level + 1))
      }
    }

    // Start with root categories (those without parents)
    cats.filter((cat) => cat.parentIds.length === 0).forEach((rootCat) => addCategoryWithLevel(rootCat, 0))

    return result
  }

  const organizedCategories = organizeCategories(categories)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Add Category Form */}
      <Card>
        <CardHeader>
          <CardTitle>Thêm danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên</Label>
              <Input id="name" value={formData.name} onChange={handleNameChange} required />
              <p className="text-sm text-muted-foreground">Tên là cách nó xuất hiện trên trang web của bạn.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Đường dẫn</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">
                "slug" là đường dẫn thân thiện của tên. Nó thường chỉ bao gồm kí tự viết thường, số và dấu gạch ngang.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Danh mục cha</Label>
              <MultiSelect
                options={categories.map((cat) => ({
                  label: cat.name,
                  value: cat.id,
                }))}
                selected={formData.parentIds}
                onChange={(values) => setFormData({ ...formData, parentIds: values })}
                placeholder="Chọn danh mục cha"
              />
              <p className="text-sm text-muted-foreground">Chọn một hoặc nhiều danh mục cha nếu đây là danh mục con.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
              <p className="text-sm text-muted-foreground">
                Thông thường mô tả này không được sử dụng trong các giao diện, tuy nhiên có vài giao diện có thể hiển
                thị mô tả này.
              </p>
            </div>

            <Button type="submit">Thêm danh mục</Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories Tree View */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {organizedCategories.length > 0 ? (
              organizedCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2" style={{ marginLeft: `${category.level! * 20}px` }}>
                    <span className="text-muted-foreground">{"-".repeat(category.level! + 1)}</span>
                    <span>{category.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteClick(category.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">Chưa có danh mục nào.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa danh mục</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
