import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import React from "react";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "mern stack", label: "MERN Stack" },
  { id: "frontend", label: "Frontend Development" },
  { id: "backend", label: "Backend Development" },
  { id: "fullstack", label: "Full Stack Development" },
  { id: "devops", label: "DevOps" },
  { id: "uiux", label: "UI/UX Design" },
  { id: "javascript", label: "JavaScript" },
  { id: "reactjs", label: "React JS" },
  { id: "mongodb", label: "MongoDB" },
  { id: "nodejs", label: "Node JS" },
];

const FilterPage = () => {
  const handleCategoryChange = (categoryId) => {};
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select>
          <SelectTrigger className="cursor-pointer">
            <SelectValue placeholder="Sort by"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem className="cursor-pointer" value="low">
                Low to high
              </SelectItem>
              <SelectItem className="cursor-pointer" value="high">
                High to low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="font-semibold mb-2">CATEGORY</h1>
        {categories.map((category) => (
          <div className="flex items-center space-x-2 my-2">
            <Checkbox
              id={category.id}
              className="cursor-pointer border-gray-600"
              onCheckedChange={() => handleCategoryChange(category.id)}
            ></Checkbox>
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPage;
