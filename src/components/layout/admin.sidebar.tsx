'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    AppstoreOutlined,
    BarChartOutlined,
    BookOutlined,
    CameraOutlined,
    CommentOutlined,
    FileOutlined,
    FolderOpenOutlined,
    LayoutOutlined,
    LineChartOutlined,
    MailOutlined,
    PushpinOutlined,
    SettingOutlined,
    TeamOutlined,
    ToolOutlined,
    VideoCameraOutlined,

} from '@ant-design/icons';
import React, { useContext } from 'react';
import { AdminContext } from "@/library/admin.context"; 
import type { MenuProps } from 'antd';
import Link from 'next/link'
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>['items'][number];
const AdminSideBar = () => {
    const { Sider } = Layout;
    const { collapseMenu } = useContext(AdminContext)!;
    const router = useRouter();

    const items: MenuItem[] = [

        {
            key: 'grp',
            label: 'ItranEdu',
            type: 'group',
            children: [
                {
                    key: "dashboard",
                    label: <Link href={"/dashboard"}>Dashboard</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "users",
                    label: <Link href={"/dashboard/user"}>Manage Users</Link>,
                    icon: <TeamOutlined />,
                },
                {
                    key: 'analytics',
                    label: 'Analytics',
                    icon: <LineChartOutlined />,
                    children: [
                        {
                            key: 'g1',
                            label: 'Revenue',
                            onClick: () => router.push("/dashboard/analytic"),
                        },
                        {
                            key: 'g2',
                            label: 'Engagement',
                        },
                        {
                            key: 'g3',
                            label: 'Users',
                        },
                        {
                            key: 'g4',
                            label: 'Reviews',
                        },
                    ],
                },
                {
                    key: 'seo',
                    label: <Link href={"/dashboard/seo"}>SEO</Link>,
                    icon: <BarChartOutlined />
                },  
                {
                    type: 'divider',
                },
                {
                    key: "course",
                    label: <Link href={"/dashboard/course"}>Course</Link>,
                    icon: <BookOutlined />,
                },

                {
                    key: 'post',
                    label: 'Post',
                    icon: <PushpinOutlined />,
                    children: [
                        {
                            key: 'sub3',
                            label: 'Posts',
                            onClick: () => router.push('/dashboard/post'),
                        },
                        {
                            key: 'sub4',
                            label: 'New post',
                        },
                        {
                            key: 'sub5',
                            label: 'Category',
                        },
                        {
                            key: 'sub6',
                            label: 'Tag',
                        },
                    ],
                },
                {
                    key: 'media',
                    label: 'Media',
                    icon: <CameraOutlined />,
                    children: [
                        { key: '9', label: 'Library', onClick: () => router.push("/dashboard/media") },
                        { key: '10', label: 'Upload' },
                    ],
                },
                {
                    key: 'page',
                    label: 'Page',
                    icon: <FolderOpenOutlined />,
                    children: [
                        { key: '13', label: 'Pages', onClick: () => router.push("/dashboard/page") },
                        { key: '14', label: 'New page' },
                    ],
                },
                {
                    key: 'eRoom',
                    label: 'eRoom',
                    icon: <VideoCameraOutlined />,
                    children: [
                        { key: '26', label: 'Meetings', onClick: () => router.push("/dashboard/eroom") },
                        { key: '27', label: 'Users' },
                    ],
                },
                {
                    key: 'layout',
                    label: 'Layout',
                    icon: <LayoutOutlined />,
                    children: [
                        { key: '15', label: 'Layouts', onClick: () => router.push("/dashboard/layout") },
                        { key: '16', label: 'New layout' },
                    ],
                },
                {
                    key: 'comment',
                    label: <Link href={"/dashboard/comment"}>Comment</Link>,
                    icon: <CommentOutlined />,
                },
                {
                    key: 'tool',
                    label: <Link href={"/dashboard/tool"}>Tools</Link>,
                    icon: <ToolOutlined />
                },
                {
                    key: 'setting',
                    label: 'Setting',
                    icon: <SettingOutlined />,
                    children: [
                        { key: '17', label: 'General', onClick: () => router.push("/dashboard/setting") },
                        { key: '18', label: 'Writing' },
                        { key: '19', label: 'Reading' },
                        { key: '20', label: 'Comment' },
                        { key: '21', label: 'Media' },
                        { key: '22', label: 'Permalink' },
                        { key: '23', label: 'Privacy' },
                        { key: '24', label: 'Favicon' },
                        { key: '25', label: 'Share' },


                    ],
                },
            ],
        },
    ];

    return (
        <Sider
            collapsed={collapseMenu}
        >

            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={items}
                style={{ height: '100vh' }}
            />
        </Sider>
    )
}

export default AdminSideBar;