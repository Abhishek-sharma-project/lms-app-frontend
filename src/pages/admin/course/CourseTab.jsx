import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation,
} from "@/features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    courseThumbnail: "",
    coursePrice: "",
  });
  const params = useParams();
  const courseId = params.courseId;
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });

  const [publishCourse, {}] = usePublishCourseMutation();
  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        courseThumbnail: "",
        coursePrice: course.coursePrice || "",
      });
      if (course?.courseThumbnail) {
        setPreviewThumbnail(course.courseThumbnail);
      }
    }
  }, [courseByIdData]);

  const [editCourse, { data, isSuccess, error, isError, isLoading }] =
    useEditCourseMutation();

  const [
    removeCourse,
    {
      data: removeData,
      error: removeError,
      isSuccess: removeSuccess,
      isLoading: removeLoading,
      isError: removeIsError,
    },
  ] = useRemoveCourseMutation();

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const validateCourseFields = () => {
    if (!input.courseLevel || !input.coursePrice) {
      toast.info("Add course level and price first!");
      return false;
    }
    return true;
  };

  const updateCourseHandler = async () => {
    if (!validateCourseFields()) return;
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      if (!validateCourseFields()) return;
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data?.message);
      }

      if (response.error) {
        toast.error(response.error.data?.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const removeCourseHandler = async () => {
    await removeCourse(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course update");
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message);
      navigate("/admin/course");
    }
    if (removeIsError) {
      toast.error(removeError?.data?.message);
    }
  }, [removeSuccess, removeIsError]);

  if (courseByIdLoading) {
    return (
      <>
        <h1 className="text-center py-10">Loading...</h1>
      </>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Course Details</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button
            disabled={removeLoading}
            className="cursor-pointer"
            onClick={removeCourseHandler}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              " Remove Course"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div className="flex flex-col gap-2">
            <Label className="mx-1">Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Eg. Full Stack Developer"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="mx-1">Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Eg. Become a fullstack developer from basic to advance"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="mx-1">Description</Label>
            <RichTextEditor
              input={input}
              setInput={setInput}
              courseByIdData={courseByIdData}
            ></RichTextEditor>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-5">
            <div className="flex flex-col gap-2">
              <Label className="mx-1 cursor-pointer">Category</Label>
              <Select value={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="frontend">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="backend">Backend Development</SelectItem>
                    <SelectItem value="fullstack">
                      Fullstack Development
                    </SelectItem>
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
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-0.5 mx-1">
                Course Level<span className="text-red-500">*</span>
              </Label>
              <Select
                value={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="flex items-center gap-0.5 mx-1">
                Price in (INR)<span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                placeholder="Enter course price"
                value={input.coursePrice}
                onChange={changeEventHandler}
                name="coursePrice"
                className="w-fit [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="mx-1 gap-0.5">
              Course Thumbnail <span className="text-red-500">*</span>
            </Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit cursor-pointer"
              onChange={selectThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="Course Thumbnail"
                className="w-full sm:w-64 my-2 rounded-lg object-cover"
              />
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => navigate("/admin/course")}
            >
              Cancel
            </Button>
            <Button
              onClick={updateCourseHandler}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
