import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

const LectureTab = () => {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make Changes and click save when you are done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button className="cursor-pointer" variant="destructive">
            Remove Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input type="text" placeholder="Eg. Introduction to React JS" />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            placeholder="Eg. Introduction to React JS"
            className="w-fit cursor-pointer"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch id="free" className="cursor-pointer" />
          <Label htmlFor="free">Is this video Free ?</Label>
        </div>
        <div className="mt-4">
          <Button className="cursor-pointer">Update Lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
