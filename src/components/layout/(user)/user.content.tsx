'use client'

import { Layout } from "antd";

const UserContent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { Content } = Layout;

    return (
        <Content>
            <div
                style={{
                    padding: 24,
                    minHeight: 'calc(100vh - 180px)',
                }}
            >
                {children}
            </div>
        </Content>
    )
}

export default UserContent;