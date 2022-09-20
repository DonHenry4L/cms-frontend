// import { useWindowWidth } from "@react-hook/window-size";

// import {
//   ProSidebar,
//   Menu,
//   MenuItem,
//   SubMenu,
//   SidebarHeader,
//   SidebarFooter,
//   SidebarContent,
// } from "react-pro-sidebar";
// import { FaList } from "react-icons/fa";
// import { FiLogOut } from "react-icons/fi";
// import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
// import { GoCommentDiscussion } from "react-icons/go";
// import { BsFilePost } from "react-icons/bs";
// import { MdPermMedia, MdOutlineDashboardCustomize } from "react-icons/md";
// import { ImUsers } from "react-icons/im";
// import { Link, NavLink } from "react-router-dom";

// import "../css/styles.css";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../../hooks";
// // import "react-pro-sidebar/dist/css/styles.css";

// export default function AuthorNavbar({
//   image,
//   // collapsed,
//   rtl,
//   toggled,
// }) {
//   const { handleLogout } = useAuth();
//   const [collapsed, setCollapsed] = useState(false);
//   const [current, setCurrent] = useState("");

//   const handleToggleSidebar = () => {
//     collapsed ? setCollapsed(false) : setCollapsed(true);
//   };

//   // hooks
//   const onlyWidth = useWindowWidth();

//   useEffect(() => {
//     if (onlyWidth < 800) {
//       setCollapsed(true);
//     } else if (onlyWidth > 800) {
//       setCollapsed(false);
//     }
//   }, [onlyWidth < 800]);

//   useEffect(() => {
//     setCurrent(window.location.pathname);
//   }, [window.location.pathname]);

//   const activeName = (name) => `${current === name && "active"}`;

//   return (
//     <div>
//       <ProSidebar
//         image={false}
//         rtl={rtl}
//         collapsed={collapsed}
//         children={React.ReactNode}
//         toggled={toggled}
//         breakPoint='xm'
//         onToggle={() => setCollapsed(!collapsed)}
//         className='xm:w-6 md:w-20 sm:w-10'
//       >
//         <NavItem to='/' className='flex'>
//           <img src='./logo192.png' alt='logo' className='h-14 p-2' />
//         </NavItem>
//         <SidebarHeader>
//           <div
//             style={{
//               padding: "24px",
//               textTransform: "uppercase",
//               fontWeight: "bold",
//               fontSize: 14,
//               letterSpacing: "1px",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//             }}
//           ></div>
//         </SidebarHeader>
//         <SidebarContent>
//           <Menu iconShape='circle'>
//             <MenuItem
//               className={activeName("/admin")}
//               icon={<MdOutlineDashboardCustomize />}
//             >
//               <NavItem to='/admin'>DashBoard</NavItem>
//             </MenuItem>
//           </Menu>

//           {/* Posts */}
//           <Menu iconShape='circle'>
//             <SubMenu
//               suffix={<span className='badge yellow'>2</span>}
//               title='Posts'
//               icon={<BsFilePost />}
//             >
//               <MenuItem className={activeName("/admin/posts")}>
//                 <NavItem to='/admin/posts'>All Posts</NavItem>
//               </MenuItem>
//               <MenuItem className={activeName("/admin/categories")}>
//                 <NavItem to='/admin/categories'>Categories</NavItem>
//               </MenuItem>
//             </SubMenu>
//           </Menu>

//           {/* Comments */}
//           <Menu iconShape='circle'>
//             <MenuItem
//               icon={<GoCommentDiscussion />}
//               className={activeName("/admin/comments")}
//             >
//               <NavItem to='/admin/comments'>Comments</NavItem>
//             </MenuItem>
//           </Menu>
//           <Menu iconShape='circle'>
//             {/* Media */}
//             <SubMenu
//               suffix={<span className='badge yellow'>2</span>}
//               title='Media'
//               icon={<MdPermMedia />}
//             >
//               <MenuItem className={activeName("/admin/media/library")}>
//                 <NavItem to='/admin/media/library'>Library</NavItem>
//               </MenuItem>
//               <MenuItem className={activeName("/admin/media/new")}>
//                 <NavItem to='/admin/media/new'>Add New</NavItem>
//               </MenuItem>
//             </SubMenu>
//           </Menu>

//           <Menu iconShape='circle'>
//             <SubMenu
//               suffix={<span className='badge yellow'>4</span>}
//               title='Users'
//               icon={<ImUsers />}
//             >
//               <MenuItem className={activeName("/admin/users")}>
//                 <NavItem to='/admin/users'>All Users</NavItem>
//               </MenuItem>
//               <MenuItem className={activeName("/admin/users/new")}>
//                 <NavItem to='/admin/users/new'>Add New</NavItem>
//               </MenuItem>

//               {/* Profile */}
//               <MenuItem>
//                 <NavItem
//                   to='/admin/userId'
//                   className={activeName("/admin/userId")}
//                 >
//                   Profile
//                 </NavItem>
//               </MenuItem>

//               {/* customize */}
//               <MenuItem className={activeName("/admin/customize")}>
//                 <NavItem to='/admin/customize'>Customize</NavItem>
//               </MenuItem>
//             </SubMenu>
//           </Menu>

//           {/* Movies & Actors */}
//           <Menu iconShape='circle'>
//             <SubMenu
//               suffix={<span className='badge yellow'>2</span>}
//               title='Movies & Actors'
//               icon={<FaList />}
//             >
//               <MenuItem className={activeName("/admin/movies")}>
//                 <NavItem to='/admin/movies'>Movies</NavItem>
//               </MenuItem>
//               <MenuItem className={activeName("/admin/actors")}>
//                 <NavItem to='/admin/actors'>Actors</NavItem>
//               </MenuItem>
//             </SubMenu>
//           </Menu>
//         </SidebarContent>

//         {/* Toggler */}
//         <div
//           className='close__menu absolute right-0 z-10 h-5 rounded-full font-bold text-3xl top-14 cursor-pointer'
//           onClick={handleToggleSidebar}
//         >
//           {collapsed ? <AiOutlineRight /> : <AiOutlineLeft />}
//         </div>

//         <SidebarFooter style={{ textAlign: "center", width: "270px" }}>
//           <div
//             className='sidebar-btn-wrapper flex-col items-start pb-5 w-[270px]'
//             style={{
//               padding: "20px 24px",
//             }}
//           >
//             <span className='font-semibold text-white text-xl'>Author</span>
//             <Link
//               to='/'
//               onClick={handleLogout}
//               className='flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1'
//             >
//               <FiLogOut />
//               <span>Log Out</span>
//             </Link>
//           </div>
//         </SidebarFooter>
//       </ProSidebar>
//     </div>
//   );
// }

// // import React from "react";
// // import { Link, NavLink } from "react-router-dom";
// // import { AiOutlineHome } from "react-icons/ai";
// // import { BiCategory, BiMoviePlay } from "react-icons/bi";
// // import { GoCommentDiscussion } from "react-icons/go";
// // import { FaUserNinja } from "react-icons/fa";
// // import { FiLogOut } from "react-icons/fi";
// // import { useAuth } from "../../../hooks";

// // export default function Navbar() {
// //   const { handleLogout } = useAuth();
// //   return (
// //     <nav className='w-48 min-h-screen bg-secondary border-r border-gray-300'>
// //       <div className='flex flex-col justify-between pl-5 h-screen sticky top-0'>
// //         <ul>
// //           <li className='mb-8'>
// //             <Link to=''>
// //               <img src='./logo192.png' alt='logo' className='h-14 p-2' />
// //             </Link>
// //           </li>

// //           <li>
// //             <NavItem to='/'>
// //               <AiOutlineHome />
// //               <span>Home</span>
// //             </NavItem>
// //           </li>
// //           <li>
// //             <NavItem to='/movies'>
// //               <BiMoviePlay />
// //               <span>Movies</span>
// //             </NavItem>
// //           </li>
// //           <li>
// //             <NavItem to='/actors'>
// //               <FaUserNinja />
// //               <span>Actors</span>
// //             </NavItem>
// //           </li>
// //           <li>
// //             <NavItem to='/categories'>
// //               <BiCategory />
// //               <span>Categories</span>
// //             </NavItem>
// //           </li>
// //           <li>
// //             <NavItem to='/comments'>
// //               <GoCommentDiscussion />
// //               <span>Comments</span>
// //             </NavItem>
// //           </li>
// //         </ul>
// //         <div className='flex-col items-start pb-5'>
// //           <span className='font-semibold text-white text-xl'>Admin</span>
// //           <Link
// //             to='/'
// //             onClick={handleLogout}
// //             className='flex items-center text-dark-subtle text-sm hover:text-white transition space-x-1'
// //           >
// //             <FiLogOut />
// //             <span>Log Out</span>
// //           </Link>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// const NavItem = ({ children, to }) => {
//   const commonClasses =
//     " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
//   return (
//     <NavLink
//       className={({ isActive }) =>
//         (isActive ? "text-white" : "text-gray-400") + commonClasses
//       }
//       to={to}
//     >
//       {children}
//     </NavLink>
//   );
// };
