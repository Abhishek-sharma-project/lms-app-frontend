import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 fixed left-0 top-0 h-screen">
        <div className="space-y-4 mt-20">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-all
              ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </NavLink>
          <NavLink
            to="course"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-all
              ${
                isActive
                  ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`
            }
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </NavLink>
        </div>
      </div>
      <div
        className="
    flex-1
    p-2 sm:p-4 md:p-6 lg:p-10 xl:p-16
    mt-20 lg:mt-8
    lg:ml-[250px] xl:ml-[300px]
    min-h-screen
    overflow-x-hidden
    transition-all duration-300
  "
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
