"use client";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
  AppstoreOutlined,
  BarChartOutlined,
  BookOutlined,
  CameraOutlined,
  CommentOutlined,
  FileDoneOutlined,
  FileOutlined,
  FolderOpenOutlined,
  FormOutlined,
  LayoutOutlined,
  LineChartOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  ProfileOutlined,
  PushpinOutlined,
  SettingOutlined,
  SignatureOutlined,
  StarOutlined,
  TeamOutlined,
  ToolOutlined,
  TrophyOutlined,
  UsergroupDeleteOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect } from "react";
import { Button, type MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserContext } from "@/library/user.context";

type MenuItem = Required<MenuProps>["items"][number];
const UserSideBar = () => {
  const { Sider } = Layout;
  const { collapseMenu } = useContext(UserContext)!;
  const router = useRouter();

  const items: MenuItem[] = [
    {
      key: "grp",
      label: "ItranEdu",
      type: "group",
      children: [
        {
          key: "dashboard",
          label: <Link href={"/user"}>Bảng điều khiển</Link>,
          icon: <AppstoreOutlined />,
        },
        {
          key: "profiles",
          label: <Link href={"/user/profiles"}>Profiles</Link>,
          icon: <ProfileOutlined />,
        },
        {
          key: "courses",
          label: <Link href={"/user/enrolled_courses"}>Các khóa học đã đăng ký</Link>,
          icon: <BookOutlined />,
        },
        {
          key: "messages",
          label: "Tin nhắn",
          icon: <MessageOutlined />,
        },
        {
          key: "wishlist",
          label: "Danh sách mong muốn",
          icon: <StarOutlined />,
        },
        {
          key: "quizzes",
          label: "Bài kiểm tra đã đăng ký",
          icon: <FileDoneOutlined />,
        },
        {
          key: "enroll_course",
          label: "Danh sách đăng ký khóa học",
          icon: <FormOutlined />,
        },
        {
          key: "groups",
          label: "Nhóm",
          icon: <UsergroupDeleteOutlined />,
        },
        {
          key: "assignments",
          label: "Bài tập",
          icon: <SignatureOutlined />,
        },
        {
          key: "points",
          label: "Lịch sử điểm",
          icon: <TrophyOutlined />,
        },
        {
          key: "setting",
          label: "Cài đặt",
          icon: <SettingOutlined />,
          children: [
            { key: "18", label: "Writing" },
            { key: "19", label: "Reading" },
            { key: "20", label: "Comment" },
            { key: "21", label: "Media" },
            { key: "22", label: "Permalink" },
            { key: "23", label: "Privacy" },
            { key: "24", label: "Favicon" },
            { key: "25", label: "Share" },
          ],
        },
      ],
    },
  ];

  return (
    <Sider collapsed={collapseMenu}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        style={{ height: "100vh" }}
      />
    </Sider>
  );
};

export default UserSideBar;
