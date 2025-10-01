import React from "react";
import Login from "../src/pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";

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
          element: <MyLearning></MyLearning>,
        },
        {
          path: "profile",
          element: <Profile></Profile>,
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
