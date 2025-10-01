import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import React from "react";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-l-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-0">
      <div className="relative">
        <img
          src="/Reactjs.png"
          className="w-full h-36 object-cover rounded-t-lg"
          alt="course"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          React js Complete Course
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage alt="avatar" />
              <AvatarFallback>Img</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">React JS</h1>
          </div>
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            Advance
          </Badge>
        </div>
        <div className="text-lg font-bold">
          <span>₹400</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
