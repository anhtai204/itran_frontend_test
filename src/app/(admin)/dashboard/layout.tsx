import { auth } from "@/auth";
import AdminFooter from "@/components/layout/(admin)/admin.footer";
import AdminHeader from "@/components/layout/(admin)/admin.header";
import AdminSideBar from "@/components/layout/(admin)/admin.sidebar";
import { AdminContextProvider } from "@/library/admin.context";

import type { Metadata } from "next";
import { Sidebar } from "@/components/admin.sidebar";
import { Header } from "@/components/admin.header";
import { StatsCard } from "@/components/stats-card";
import { Card } from "@/components/ui/card";

import ai6 from "@/assets/images/ai6.png";
import Image from "next/image";
import AdminContent from "@/components/admin.content";

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <Header />

        <AdminContent>{children}</AdminContent>
      </div>
    </div>
  );
};

export default AdminLayout;
