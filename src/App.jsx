import React from "react";
import Login from "../src/pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import { Navigate, RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import Purchase from "./components/Purchase";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import { AdminRoute, ProtectedRoute } from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: (
            <>
              <HeroSection></HeroSection>
              <Courses></Courses>
            </>
          ),
        },
        {
          path: "login",
          element: <Login></Login>,
        },
        {
          path: "my-learning",
          element: (
            <ProtectedRoute>
              <MyLearning></MyLearning>
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          ),
        },
        {
          path: "course/search",
          element: (
            <ProtectedRoute>
              <SearchPage></SearchPage>
            </ProtectedRoute>
          ),
        },
        {
          path: "course-detail/:courseId",
          element: (
            <ProtectedRoute>
              <CourseDetail></CourseDetail>
            </ProtectedRoute>
          ),
        },
        {
          path: "purchase/:transactionId",
          element: (
            <ProtectedRoute>
              <Purchase></Purchase>
            </ProtectedRoute>
          ),
        },
        {
          path: "course-progress/:courseId",
          element: (
            <ProtectedRoute>
              <PurchaseCourseProtectedRoute>
                <CourseProgress></CourseProgress>
              </PurchaseCourseProtectedRoute>
            </ProtectedRoute>
          ),
        },

        // admin routes
        {
          path: "admin",
          element: (
            <AdminRoute>
              <Sidebar></Sidebar>
            </AdminRoute>
          ),
          children: [
            {
              index: true,
              element: <Navigate to="dashboard" replace />,
            },
            {
              path: "dashboard",
              element: <Dashboard></Dashboard>,
            },
            {
              path: "course",
              element: <CourseTable></CourseTable>,
            },
            {
              path: "course/create",
              element: <AddCourse></AddCourse>,
            },
            {
              path: "course/:courseId",
              element: <EditCourse></EditCourse>,
            },
            {
              path: "course/:courseId/lecture",
              element: <CreateLecture></CreateLecture>,
            },
            {
              path: "course/:courseId/lecture/:lectureId",
              element: <EditLecture></EditLecture>,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
};

export default App;
