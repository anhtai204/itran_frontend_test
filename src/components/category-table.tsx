// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Pencil, Trash2 } from "lucide-react"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { CategoryDialog } from "./category-dialog" 

// interface Category {
//   id: string
//   name: string
//   description: string
//   slug: string
//   parent_id: string | null
//   children?: Category[]
// }

// interface CategoryTableProps {
//   categories: Category[]
//   onUpdate: (category: Category) => void
//   onDelete: (id: string) => void
// }

// export function CategoryTable({ categories, onUpdate, onDelete }: CategoryTableProps) {
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null)
//   const [deletingCategory, setDeletingCategory] = useState<string | null>(null)

//   const handleEdit = (category: Category) => {
//     setEditingCategory(category)
//   }

//   const handleDelete = (categoryId: string) => {
//     setDeletingCategory(categoryId)
//   }

//   const confirmDelete = () => {
//     if (deletingCategory) {
//       onDelete(deletingCategory)
//       setDeletingCategory(null)
//     }
//   }

//   const getParentName = (parent_id: string | null) => {
//     if (!parent_id) return "—"
//     const parent = categories.find((cat) => cat.id === parent_id)
//     return parent ? parent.name : "—"
//   }

//   return (
//     <>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Tên</TableHead>
//             <TableHead>Mô tả</TableHead>
//             <TableHead>Slug</TableHead>
//             <TableHead>Danh mục cha</TableHead>
//             <TableHead className="w-[100px]">Thao tác</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {categories.map((category) => (
//             <TableRow key={category.id}>
//               <TableCell className="font-medium">{category.name}</TableCell>
//               <TableCell>{category.description}</TableCell>
//               <TableCell>{category.slug}</TableCell>
//               <TableCell>{getParentName(category.parent_id)}</TableCell>
//               <TableCell>
//                 <div className="flex items-center gap-2">
//                   <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
//                     <Pencil className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {editingCategory && (
//         <CategoryDialog
//           open={!!editingCategory}
//           onOpenChange={() => setEditingCategory(null)}
//           onSubmit={(updatedCategory) => {
//             onUpdate({ ...updatedCategory, id: editingCategory.id })
//             setEditingCategory(null)
//           }}
//           categories={categories}
//           defaultValues={editingCategory}
//         />
//       )}

//       <AlertDialog open={!!deletingCategory} onOpenChange={() => setDeletingCategory(null)}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
//             <AlertDialogDescription>
//               Hành động này không thể hoàn tác. Danh mục này sẽ bị xóa vĩnh viễn.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Hủy</AlertDialogCancel>
//             <AlertDialogAction onClick={confirmDelete}>Xóa</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   )
// }

