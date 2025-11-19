import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, isSuccess, error, isError }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = async (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  // for display success and error

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created");
      navigate("/admin/course");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create course");
    }
  }, [isSuccess, error, isError]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Let's add a course</h1>
        <p className="text-sm">
          Add the course title, select a category. You can update these later if
          needed.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label className="mx-1">Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          ></Input>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="mx-1">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="fullstack">Fullstack Development</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
                <SelectItem value="html-css">HTML & CSS</SelectItem>
                <SelectItem value="react">React JS</SelectItem>
                <SelectItem value="nextjs">Next JS</SelectItem>
                <SelectItem value="datascience-ai">
                  Data Science & AI
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => navigate("/admin/course")}
          >
            Back
          </Button>
          <Button
            className="cursor-pointer"
            disabled={isLoading}
            onClick={createCourseHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                Please Wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
