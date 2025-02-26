// "use client";
// import { DeleteTwoTone, EditTwoTone, UserOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Dropdown,
//   Menu,
//   MenuProps,
//   message,
//   Popconfirm,
//   Select,
//   Space,
//   Table,
// } from "antd";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import UserCreate from "./user.create";
// import UserUpdate from "./user.update";
// import { handleDeleteUserAction } from "@/utils/action";
// import { title } from "process";

// interface IProps {
//   users: any;
//   meta: {
//     current: number;
//     pageSize: number;
//     pages: number;
//     total: number;
//   };
// }
// const UserRole = (props: IProps) => {
//   const { users, meta } = props;
//   console.log(">>>users: ", users);
//   console.log(">>>meta: ", meta);
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();

//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
//   const [dataUpdate, setDataUpdate] = useState<any>(null);

//   const [userRoles, setUserRoles] = useState<{ [key: string]: string }>({});

//   const handleChange = (value: string[]) => {
//     console.log(`selected ${value}`);
//   };

//   const options = [
//     {
//       label: "Admin",
//       value: "admin",
//       emoji: "Ad",
//       desc: "Admin",
//     },
//     {
//       label: "Editor",
//       value: "editor",
//       emoji: "Ed",
//       desc: "Editor",
//     },
//     {
//       label: "Teacher",
//       value: "teacher",
//       emoji: "Gv",
//       desc: "Teacher",
//     },
//     {
//       label: "Student",
//       value: "student",
//       emoji: "Hs",
//       desc: "Student",
//     },
//     {
//       label: "Teaching Assistant",
//       value: "Teaching Assistant",
//       emoji: "Ta",
//       desc: "Teaching Assistant",
//     },
//   ];

//   // const roles = ["Admin", "Editor", "Teacher", "Student", "Teaching Assistant"];

//   const columns = [
//     {
//       title: "STT",
//       render: (_: any, record: any, index: any) => {
//         return <>{index + 1 + (meta.current - 1) * meta.pageSize}</>;
//       },
//     },
//     {
//       title: "id",
//       dataIndex: "id",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//     },
//     {
//       title: "Role",
//       render: (text: any, record: any, index: any) => {
//         return (
//           <Select
//             mode="multiple"
//             style={{ width: "60%" }}
//             placeholder="select roles for user"
//             defaultValue={["student"]}
//             onChange={handleChange}
//             options={options}
//             optionRender={(option) => (
//               <Space>
//                 <span role="img" aria-label={option.data.label}>
//                   {option.data.emoji}
//                 </span>
//                 {option.data.desc}
//               </Space>
//             )}
//           />
//         );
//       },
//     },
//     {
//       title: "Actions",

//       render: (text: any, record: any, index: any) => {
//         return (
//           <>
//             <EditTwoTone
//               twoToneColor="#f57800"
//               style={{ cursor: "pointer", margin: "0 20px" }}
//               onClick={() => {
//                 setIsUpdateModalOpen(true);
//                 setDataUpdate(record);
//               }}
//             />

//             <Popconfirm
//               placement="leftTop"
//               title={"Xác nhận xóa user"}
//               description={"Bạn có chắc chắn muốn xóa user này ?"}
//               onConfirm={async () => await handleDeleteUserAction(record?.id)}
//               okText="Xác nhận"
//               cancelText="Hủy"
//             >
//               <span style={{ cursor: "pointer" }}>
//                 <DeleteTwoTone twoToneColor="#ff4d4f" />
//               </span>
//             </Popconfirm>
//           </>
//         );
//       },
//     },
//   ];

//   const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
//     if (pagination && pagination.current) {
//       const params = new URLSearchParams(searchParams);
//       params.set("current", pagination.current);
//       replace(`${pathname}?${params.toString()}`);
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 20,
//         }}
//       >
//         <span>Manager Users</span>
//         <Button onClick={() => setIsCreateModalOpen(true)}>Create User</Button>
//       </div>
//       <Table
//         bordered
//         dataSource={users}
//         // dataSource={users.map((user: any) => ({ ...user, key: user.id }))}
//         columns={columns}
//         rowKey={"id"}
//         pagination={{
//           current: meta.current,
//           pageSize: meta.pageSize,
//           showSizeChanger: true,
//           total: meta.total,
//           showTotal: (total, range) => {
//             return (
//               <div>
//                 {" "}
//                 {range[0]}-{range[1]} trên {total} rows
//               </div>
//             );
//           },
//         }}
//         onChange={onChange}
//       />

//       <UserCreate
//         isCreateModalOpen={isCreateModalOpen}
//         setIsCreateModalOpen={setIsCreateModalOpen}
//       />

//       <UserUpdate
//         isUpdateModalOpen={isUpdateModalOpen}
//         setIsUpdateModalOpen={setIsUpdateModalOpen}
//         dataUpdate={dataUpdate}
//         setDataUpdate={setDataUpdate}
//       />
//     </>
//   );
// };

// export default UserRole;
