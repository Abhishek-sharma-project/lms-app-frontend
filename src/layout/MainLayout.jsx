import React from "react";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";

const MainLayout = () => {
  const { pathname } = useLocation();

  const hideFooter =
    pathname.startsWith("/course-progress") ||
    pathname.startsWith("/purchase") ||
    pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
      {!hideFooter && <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
