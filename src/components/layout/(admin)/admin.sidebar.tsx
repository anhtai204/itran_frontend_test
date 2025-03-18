// 'use client'
// import Layout from "antd/es/layout";
// import Menu from "antd/es/menu";
// import {
//     AppstoreOutlined,
//     BarChartOutlined,
//     BookOutlined,
//     CameraOutlined,
//     CommentOutlined,
//     FileOutlined,
//     FolderOpenOutlined,
//     LayoutOutlined,
//     LineChartOutlined,
//     MailOutlined,
//     PushpinOutlined,
//     SettingOutlined,
//     TeamOutlined,
//     ToolOutlined,
//     VideoCameraOutlined,

// } from '@ant-design/icons';
// import React, { useContext } from 'react';
// import { AdminContext } from "@/library/admin.context"; 
// import type { MenuProps } from 'antd';
// import Link from 'next/link'
// import { useRouter } from "next/navigation";

// type MenuItem = Required<MenuProps>['items'][number];
// const AdminSideBar = () => {
//     const { Sider } = Layout;
//     const { collapseMenu } = useContext(AdminContext)!;
//     const router = useRouter();

//     const items: MenuItem[] = [

//         {
//             key: 'grp',
//             label: 'ItranEdu',
//             type: 'group',
//             children: [
//                 {
//                     key: "dashboard",
//                     label: <Link href={"/dashboard"}>Dashboard</Link>,
//                     icon: <AppstoreOutlined />,
//                 },
//                 {
//                     key: "users",
//                     label: <Link href={"/dashboard/user"}>Manage Users</Link>,
//                     icon: <TeamOutlined />,
//                 },
//                 {
//                     key: 'analytics',
//                     label: 'Analytics',
//                     icon: <LineChartOutlined />,
//                     children: [
//                         {
//                             key: 'g1',
//                             label: 'Revenue',
//                             onClick: () => router.push("/dashboard/analytic"),
//                         },
//                         {
//                             key: 'g2',
//                             label: 'Engagement',
//                         },
//                         {
//                             key: 'g3',
//                             label: 'Users',
//                         },
//                         {
//                             key: 'g4',
//                             label: 'Reviews',
//                         },
//                     ],
//                 },
//                 {
//                     key: 'seo',
//                     label: <Link href={"/dashboard/seo"}>SEO</Link>,
//                     icon: <BarChartOutlined />
//                 },  
//                 {
//                     type: 'divider',
//                 },
//                 {
//                     key: "course",
//                     label: <Link href={"/dashboard/course"}>Course</Link>,
//                     icon: <BookOutlined />,
//                 },

//                 {
//                     key: 'post',
//                     label: 'Post',
//                     icon: <PushpinOutlined />,
//                     children: [
//                         {
//                             key: 'sub3',
//                             label: 'Posts',
//                             onClick: () => router.push('/dashboard/post'),
//                         },
//                         {
//                             key: 'sub4',
//                             label: 'New post',
//                         },
//                         {
//                             key: 'sub5',
//                             label: 'Category',
//                         },
//                         {
//                             key: 'sub6',
//                             label: 'Tag',
//                         },
//                     ],
//                 },
//                 {
//                     key: 'media',
//                     label: 'Media',
//                     icon: <CameraOutlined />,
//                     children: [
//                         { key: '9', label: 'Library', onClick: () => router.push("/dashboard/media") },
//                         { key: '10', label: 'Upload' },
//                     ],
//                 },
//                 {
//                     key: 'page',
//                     label: 'Page',
//                     icon: <FolderOpenOutlined />,
//                     children: [
//                         { key: '13', label: 'Pages', onClick: () => router.push("/dashboard/page") },
//                         { key: '14', label: 'New page' },
//                     ],
//                 },
//                 {
//                     key: 'eRoom',
//                     label: 'eRoom',
//                     icon: <VideoCameraOutlined />,
//                     children: [
//                         { key: '26', label: 'Meetings', onClick: () => router.push("/dashboard/eroom") },
//                         { key: '27', label: 'Users' },
//                     ],
//                 },
//                 {
//                     key: 'layout',
//                     label: 'Layout',
//                     icon: <LayoutOutlined />,
//                     children: [
//                         { key: '15', label: 'Layouts', onClick: () => router.push("/dashboard/layout") },
//                         { key: '16', label: 'New layout' },
//                     ],
//                 },
//                 {
//                     key: 'comment',
//                     label: <Link href={"/dashboard/comment"}>Comment</Link>,
//                     icon: <CommentOutlined />,
//                 },
//                 {
//                     key: 'tool',
//                     label: <Link href={"/dashboard/tool"}>Tools</Link>,
//                     icon: <ToolOutlined />
//                 },
//                 {
//                     key: 'setting',
//                     label: 'Setting',
//                     icon: <SettingOutlined />,
//                     children: [
//                         { key: '17', label: 'General', onClick: () => router.push("/dashboard/setting") },
//                         { key: '18', label: 'Writing' },
//                         { key: '19', label: 'Reading' },
//                         { key: '20', label: 'Comment' },
//                         { key: '21', label: 'Media' },
//                         { key: '22', label: 'Permalink' },
//                         { key: '23', label: 'Privacy' },
//                         { key: '24', label: 'Favicon' },
//                         { key: '25', label: 'Share' },


//                     ],
//                 },
//             ],
//         },
//     ];

//     return (
//         <Sider
//             collapsed={collapseMenu}
//         >

//             <Menu
//                 mode="inline"
//                 defaultSelectedKeys={['dashboard']}
//                 items={items}
//                 style={{ height: '100vh' }}
//             />
//         </Sider>
//     )
// }

// export default AdminSideBar;






"use client"

import { useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserContext } from "@/library/user.context"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Star,
  FileCheck,
  ClipboardList,
  Users,
  PenTool,
  Trophy,
  Settings,
  User,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const AdminSideBar = () => {
  const { collapseMenu } = useContext(UserContext)!
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Bảng điều khiển",
      href: "/user",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Profiles",
      href: "/user/profiles",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Các khóa học đã đăng ký",
      href: "/user/enrolled_courses",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Tin nhắn",
      href: "/user/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Danh sách mong muốn",
      href: "/user/wishlist",
      icon: <Star className="h-5 w-5" />,
    },
    {
      title: "Bài kiểm tra đã đăng ký",
      href: "/user/quizzes",
      icon: <FileCheck className="h-5 w-5" />,
    },
    {
      title: "Danh sách đăng ký khóa học",
      href: "/user/courses",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Nhóm",
      href: "/user/groups",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Bài tập",
      href: "/user/assignments",
      icon: <PenTool className="h-5 w-5" />,
    },
    {
      title: "Lịch sử điểm",
      href: "/user/points",
      icon: <Trophy className="h-5 w-5" />,
    },
  ]

  const settingsItems = [
    { title: "Writing", href: "/user/settings/writing" },
    { title: "Reading", href: "/user/settings/reading" },
    { title: "Comment", href: "/user/settings/comment" },
    { title: "Media", href: "/user/settings/media" },
    { title: "Permalink", href: "/user/settings/permalink" },
    { title: "Privacy", href: "/user/settings/privacy" },
    { title: "Favicon", href: "/user/settings/favicon" },
    { title: "Share", href: "/user/settings/share" },
  ]

  return (
    <aside
      className={cn(
        "bg-white dark:bg-gray-800 border-r h-screen transition-all duration-300 ease-in-out",
        collapseMenu ? "w-20" : "w-64",
      )}
    >
      <div className="py-4">
        <div className={cn("px-3 py-2 text-lg font-semibold", collapseMenu ? "text-center" : "px-6")}>
          {collapseMenu ? "IE" : "ItranEdu"}
        </div>

        <nav className="mt-5 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                    collapseMenu && "justify-center",
                  )}
                >
                  {item.icon}
                  {!collapseMenu && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}

            <li>
              {collapseMenu ? (
                <Link
                  href="/user/settings"
                  className="flex justify-center items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Settings className="h-5 w-5" />
                </Link>
              ) : (
                <Accordion type="single" collapsible className="border-none">
                  <AccordionItem value="settings" className="border-none">
                    <AccordionTrigger className="py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                      <div className="flex items-center">
                        <Settings className="h-5 w-5" />
                        <span className="ml-3">Cài đặt</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="pl-9 space-y-1 mt-1">
                        {settingsItems.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                pathname === item.href
                                  ? "bg-primary/10 text-primary"
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                              )}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default AdminSideBar;

