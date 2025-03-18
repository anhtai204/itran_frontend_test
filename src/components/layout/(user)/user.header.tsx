// 'use client'
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
// import { Button, Layout } from 'antd';
// import { useContext } from 'react';
// import { DownOutlined, SmileOutlined } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Dropdown, Space } from 'antd';
// import { signOut } from "next-auth/react";
// import { UserContext } from '@/library/user.context';

// const UserHeader = (props: any) => {
//     const {session} = props;
//     console.log('>>> check data: ', session);
//     const { Header } = Layout;
//     const { collapseMenu, setCollapseMenu } = useContext(UserContext)!;

//     const items: MenuProps['items'] = [
//         {
//             key: '1',
//             label: (
//                 <span>
//                     Settings
//                 </span>
//             ),
//         },
//         {
//             key: '4',
//             danger: true,
//             label: <span onClick={() => signOut()}>Đăng xuất</span>,
//         },
//     ];

//     return (
//         <>
//             <Header
//                 style={{
//                     padding: 0,
//                     display: "flex",
//                     background: "#f5f5f5",
//                     justifyContent: "space-between",
//                     alignItems: "center"
//                 }} >

//                 <Button
//                     type="text"
//                     icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//                     onClick={() => setCollapseMenu(!collapseMenu)}
//                     style={{
//                         fontSize: '16px',
//                         width: 64,
//                         height: 64,
//                     }}
//                 />
//                 <Dropdown menu={{ items }} >
//                     <a onClick={(e) => e.preventDefault()}
//                         style={{ color: "unset", lineHeight: "0 !important", marginRight: 20 }}
//                     >
//                         <Space>
//                             Welcome {session?.user?.email ?? ""}
//                             <DownOutlined />
//                         </Space>
//                     </a>
//                 </Dropdown>
//             </Header>
//         </>
//     )
// }

// export default UserHeader;

'use client'

import { useContext } from 'react';
import { signOut } from "next-auth/react";
import { UserContext } from '@/library/user.context';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, PanelLeftClose } from 'lucide-react';

const UserHeader = (props: any) => {
  const { session } = props;
  const { collapseMenu, setCollapseMenu } = useContext(UserContext)!;

  return (
    <header className="flex justify-between items-center px-0 py-0 bg-gray-100 border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapseMenu(!collapseMenu)}
        className="w-16 h-16 text-base"
      >
        {collapseMenu ? <Menu /> : <PanelLeftClose />}
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="mr-5 flex items-center gap-2">
            Welcome {session?.user?.email ?? ""}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-destructive focus:text-destructive" 
            onClick={() => signOut()}
          >
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default UserHeader;
