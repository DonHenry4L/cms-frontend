import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import Header from "../components/admin/Header";
import AdminNavbar from "../components/admin/nav/AdminNavbar";
import NotFound from "../components/NotFound";

export default function UserNavigator() {
  return (
    <>
      <div className='flex dark:bg-primary bg-white'>
        <AdminNavbar />
        <div className='flex-1 max-w-screen-xl'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
