"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BarChart2,
  ShoppingCart,
  Layout,
  AppWindowIcon as Apps,
  CreditCard,
  Box,
  Component,
  FileIcon,
  Table,
  Lock,
  UserCircle,
  Clock,
  File,
  HelpCircle,
  DollarSign,
  PieChart,
} from "lucide-react"

const menuItems = [
  {
    title: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
      {
        title: "Analysis",
        icon: BarChart2,
        href: "/analysis",
      },
      {
        title: "eCommerce",
        icon: ShoppingCart,
        href: "/ecommerce",
      },
      {
        title: "Manage User",
        icon: UserCircle,
        href: "/dashboard/user",
      },
    ],
  },
  {
    title: "UI ELEMENTS",
    items: [
      {
        title: "Widgets",
        icon: Layout,
        href: "/widgets",
      },
      {
        title: "Apps",
        icon: Apps,
        href: "/apps",
      },
      {
        title: "Cards",
        icon: CreditCard,
        href: "/cards",
      },
      {
        title: "eCommerce",
        icon: Box,
        href: "/ecommerce-ui",
      },
      {
        title: "Components",
        icon: Component,
        href: "/components",
      },
      {
        title: "Icons",
        icon: FileIcon,
        href: "/",
      },
    ],
  },
  {
    title: "FORMS & TABLES",
    items: [
      {
        title: "Forms",
        icon: File,
        href: "/",
      },
      {
        title: "Tables",
        icon: Table,
        href: "/dashboard/eroom",
      },
    ],
  },
  {
    title: "PAGES",
    items: [
      {
        title: "Authentication",
        icon: Lock,
        href: "/",
      },
      {
        title: "User Profile",
        icon: UserCircle,
        href: "/",
      },
      {
        title: "Timeline",
        icon: Clock,
        href: "/",
      },
      {
        title: "Post",
        icon: File,
        href: "/dashboard/post",
        children: [
          {
            title: "Category",
            href: "/dashboard/category",
          },
        ],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        title: "FAQ",
        icon: HelpCircle,
        href: "/faq",
      },
      {
        title: "Pricing",
        icon: DollarSign,
        href: "/pricing",
      },
      {
        title: "Charts",
        icon: PieChart,
        href: "/charts",
      },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 bottom-0 border-r bg-background">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg" />
          <span className="text-xl font-bold">ITRAN EDU</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2">
        {menuItems.map((section, i) => (
          <div key={i} className="px-4 py-2">
            <h4 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">{section.title}</h4>
            <div className="space-y-1">
              {section.items.map((item, j) => (
                <div key={j}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                  {item.children && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child, k) => (
                        <Link
                          key={k}
                          href={child.href}
                          className={cn(
                            "block text-sm text-muted-foreground hover:text-accent-foreground",
                            pathname === child.href ? "text-accent-foreground" : ""
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

