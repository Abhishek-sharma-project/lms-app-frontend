import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import React, { useEffect } from "react";
import { useGetPurchaseCoursesQuery } from "@/features/api/purchaseApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { data, isError, isLoading, refetch } = useGetPurchaseCoursesQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <h1 className="mt-20 text-center py-10">Loading...</h1>;
  if (isError)
    return (
      <h1 className="text-red-500 mt-20 text-center py-10">
        Failed to get purchased course
      </h1>
    );

  const { purchasedCourse } = data || [];

  if (!purchasedCourse || purchasedCourse.length === 0) {
    return (
      <Card className="shadow-lg p-10 text-center mt-30 text-gray-600">
        <CardTitle>No Sales Yet</CardTitle>
        <p>No sales data available yet</p>
      </Card>
    );
  }

  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice,
  }));

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;

  return (
    <div className="space-y-6">
      {/* MOBILE BUTTON */}
      <div className="lg:hidden mb-4">
        <Button
          className="w-full cursor-pointer"
          onClick={() => navigate("/admin/course")}
        >
          Go to Courses
        </Button>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{totalRevenue}</p>
          </CardContent>
        </Card>
      </div>

      {/* Cousre price card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Course Prices</CardTitle>
        </CardHeader>

        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={courseData}>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#ccc"
                opacity={0.8}
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "currentColor" }}
                tickMargin={10}
              />

              <YAxis tick={{ fill: "currentColor" }} />

              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 6, fill: "#3b82f6" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
