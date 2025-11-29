import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseTable = () => {
  const { data, isLoading, refetch } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <h1 className="text-center py-10">Loading...</h1>;

  return (
    <div>
      <Button className="cursor-pointer" onClick={() => navigate("create")}>
        Create a new course
      </Button>
      {data?.courses?.length > 0 ? (
        <Table>
          <TableCaption>A list of your recent courses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="w-[100px]">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course?.courseTitle}</TableCell>
                <TableCell className="font-medium">
                  {course?.coursePrice || "NA"}
                </TableCell>
                <TableCell>
                  <Badge>{course?.isPublished ? "Published" : "Draft"}</Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    className="cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-700"
                    size="sm"
                    variant="link"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <Edit></Edit>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <h2 className="text-center py-8 text-gray-500">
          No course found. Create your first course!
        </h2>
      )}
    </div>
  );
};

export default CourseTable;
