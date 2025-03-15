// 'use client'
// import { Layout } from 'antd';

// const AdminFooter = () => {
//     const { Footer } = Layout;

//     return (
//         <>
//             <Footer style={{ textAlign: 'center' }}>
//                 ItranEdu ©{new Date().getFullYear()} Created by @itran
//             </Footer>
//         </>
//     )
// }

// export default AdminFooter;

"use client"

const AdminFooter = () => {
  return <footer className="py-6 text-center border-t">ItranEdu ©{new Date().getFullYear()} Created by @itran</footer>
}

export default AdminFooter

