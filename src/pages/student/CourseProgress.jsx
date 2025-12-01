import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCertificateMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [getCertificate, { isLoading: loading }] = useGetCertificateMutation();

  const [updateLectureProgression] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    {
      data: markCompleteData,
      isSuccess: completedSuccess,
      isError: completeError,
      error: markCompleteError,
      reset: resetComplete,
    },
  ] = useCompleteCourseMutation();

  const [
    inCompleteCourse,
    {
      data: markInCompleteData,
      isSuccess: inCompletedSuccess,
      isError: inCompleteError,
      error: markInCompleteError,
      reset: resetInComplete,
    },
  ] = useInCompleteCourseMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData?.message);
      resetComplete();
    }
    if (completeError) {
      toast.error(markCompleteError?.data?.message);
      resetComplete();
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData?.message);
      resetInComplete();
    }
    if (inCompleteError) {
      toast.error(markInCompleteError?.data?.message);
      resetInComplete();
    }
  }, [completedSuccess, completeError, inCompletedSuccess, inCompleteError]);

  if (isLoading) {
    return <p className="mt-20 text-center py-10">Loading...</p>;
  }

  if (isError) {
    return (
      <h1 className="mt-20 text-center py-10">Failed to load course details</h1>
    );
  }

  const { courseDetails, progress, completed } = data?.data;
  const { courseTitle } = courseDetails;

  // Intialize first lecture if not exist
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some(
      (progress) => progress.lectureId === lectureId && progress.viewed
    );
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgression({ courseId, lectureId });
    refetch();
  };

  // Handle select a specfic lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture?._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  const handleDownloadCertificate = async () => {
    try {
      const res = await getCertificate(courseId).unwrap();

      if (res?.message) {
        toast.error(res.message);
        return;
      }

      const url = URL.createObjectURL(res);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${courseDetails.courseTitle}-certificate.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to download certificate");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      {/* Display course name */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold order-1">{courseTitle}</h1>

        <div className="flex flex-col sm:flex-row gap-3 order-3 sm:order-2">
          {completed && (
            <Button
              disabled={loading}
              className="cursor-pointer bg-green-600 hover:bg-green-700 text-white order-3 sm:order-1"
              onClick={handleDownloadCertificate}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Download Certificate"
              )}
            </Button>
          )}

          <Button
            className="cursor-pointer order-2 sm:order-2"
            onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
            variant={completed ? "outline" : "default"}
          >
            {completed ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
              </div>
            ) : (
              "Mark as completed"
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            {/* video */}
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              className="w-full h-auto md:rounded-lg"
              controls
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture._id)
              }
            />
          </div>
          {/* Display current watching lecture title */}
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lecture) =>
                    lecture._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
          </div>
        </div>
        {/* Lecture Sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform p-4 ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:bg-gray-700"
                    : "dark:bg-gray-900"
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture?.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
