import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Code2,
  Database,
  Palette,
  Briefcase,
  Smartphone,
  BookOpen,
} from "lucide-react";

const categories = [
  {
    label: "Web Development",
    desc: "React, MERN, Next.js & more",
    icon: Code2,
    coursesCount: 24,
  },
  {
    label: "Data Science",
    desc: "Machine learning, data analysis, visualization",
    icon: Database,
    coursesCount: 12,
  },
  {
    label: "UI / UX & Design",
    desc: "Figma, product design basics",
    icon: Palette,
    coursesCount: 8,
  },
  {
    label: "Business & Career",
    desc: "Productivity, communication",
    icon: Briefcase,
    coursesCount: 10,
  },
  {
    label: "Mobile App Development",
    desc: "React Native, Android, iOS",
    icon: Smartphone,
    coursesCount: 16,
  },
  {
    label: "Personal Development",
    desc: "Habits, mindset, English",
    icon: BookOpen,
    coursesCount: 15,
  },
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/course/search?query`);
  };

  return (
    <section className="w-full py-10 md:py-16 bg-slate-50 dark:bg-[#050816]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Browse by category
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-slate-900 dark:text-slate-50">
              Top categories to get you started
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-xl">
              Choose a path and continue learning from curated courses designed
              for students and working professionals.
            </p>
          </div>

          <Badge className="self-start md:self-auto text-xs md:text-sm px-3 py-1 rounded-full">
            Updated daily with new courses
          </Badge>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, i) => {
            const Icon = category.icon;

            return (
              <Card
                key={i}
                role="button"
                onClick={handleCategoryClick}
                className="
                  group 
                  flex flex-col justify-between
                  h-full
                  cursor-pointer
                  border border-slate-200/80 dark:border-slate-800
                  hover:border-blue-500/70 hover:shadow-md
                  bg-white/80 dark:bg-[#050816]/80
                  backdrop-blur
                  transition-all duration-200
                "
              >
                <CardHeader className="space-y-3">
                  {/* Icon + count */}
                  <div className="flex items-center justify-between">
                    <div
                      className="
                        inline-flex items-center justify-center 
                        rounded-2xl p-2.5 md:p-3 
                        border border-slate-200 dark:border-slate-700 
                        group-hover:border-blue-500/70 
                        transition-colors
                      "
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
                    </div>

                    <span
                      className="
                        text-[11px] md:text-xs font-medium 
                        px-2 py-1 rounded-full 
                        bg-blue-50 dark:bg-blue-950/40 
                        text-blue-700 dark:text-blue-300
                      "
                    >
                      {category.coursesCount}+ courses
                    </span>
                  </div>

                  {/* Title + Description */}
                  <div className="space-y-1">
                    <CardTitle
                      className="
                        text-base md:text-lg font-semibold 
                        text-slate-900 dark:text-slate-50 
                        group-hover:text-blue-600 dark:group-hover:text-blue-400
                      "
                    >
                      {category.label}
                    </CardTitle>

                    <CardDescription className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                      {category.desc}
                    </CardDescription>
                  </div>

                  <p className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    Explore courses
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </p>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
