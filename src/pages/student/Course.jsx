import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card
        className="
          overflow-hidden 
          rounded-lg
          bg-white 
          dark:bg-[#1a1a1a]
          shadow-sm
          hover:shadow-md
          hover:bg-blue-50
          dark:hover:bg-[#1e2a38]
          transition-colors duration-200
          !p-0
          w-70
        "
      >
        <div className="relative w-full h-44 overflow-hidden rounded-t-lg">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-full object-cover block"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        </div>

        <CardContent className="px-3 py-4 space-y-3">
          <h1 className="font-semibold text-[16px] leading-tight line-clamp-2 text-gray-900 dark:text-gray-100">
            {course.courseTitle}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={course.creator?.photoUrl} />
                <AvatarFallback>Img</AvatarFallback>
              </Avatar>

              <span className="text-xs font-medium truncate max-w-[120px] text-gray-700 dark:text-gray-300">
                {course.creator?.name}
              </span>
            </div>

            <Badge className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-md shadow-sm">
              {course.courseLevel}
            </Badge>
          </div>

          <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
            ₹{course.coursePrice}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
