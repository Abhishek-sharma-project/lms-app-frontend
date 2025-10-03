import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

const AddCourse = () => {
  return (
    <div className="flex-1 mx-4 sm:mx-10 py-6">
      <div className="mb-6">
        <h1 className="font-bold text-2xl sm:text-3xl text-gray-900 dark:text-gray-100">
          Let's add a course
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Add the course title, select a category, and provide a short
          description. You can update these later if needed.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            placeholder="Your Course Name"
          ></Input>
        </div>
        <div>
          <Label>Category</Label>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AddCourse;
