import React from "react";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();

  const hideFooter =
    pathname.startsWith("/course-progress") ||
    pathname.startsWith("/purchase") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/course/search") ||
    pathname.startsWith("/login");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="flex-1 bg-slate-50 dark:bg-[#050816]">
        <Outlet></Outlet>
      </div>
      {!hideFooter && <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
