'use client'
import { Layout } from 'antd';

const UserFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                ItranEdu ©{new Date().getFullYear()} Created by @itran
            </Footer>
        </>
    )
}

export default UserFooter;