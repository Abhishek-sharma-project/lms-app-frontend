import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ShieldCheck,
  Award,
  Clock,
  MonitorPlay,
  Users,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    title: "Expert Instructors",
    desc: "Learn from industry professionals with real-world experience.",
    icon: Users,
  },
  {
    title: "Certificate of Completion",
    desc: "Showcase your skills with accredited course certificates.",
    icon: Award,
  },
  {
    title: "Lifetime Access",
    desc: "Study anytime with unrestricted access to all enrolled courses.",
    icon: Clock,
  },
  {
    title: "High-Quality Content",
    desc: "Practical lessons, real projects, and modern learning methods.",
    icon: MonitorPlay,
  },
  {
    title: "Secure & Reliable",
    desc: "Your data and payments are always protected and encrypted.",
    icon: ShieldCheck,
  },
  {
    title: "Skill-Focused Learning",
    desc: "Designed to prepare you for jobs, internships, and real projects.",
    icon: BadgeCheck,
  },
];

const FeaturesSection = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-slate-50 dark:bg-[#050816]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Why choose us?
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-slate-900 dark:text-slate-50">
            Learn with confidence & grow your skills
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our LMS ensures high-quality learning experiences with practical
            content, expert guidance, and a modern interface.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <Card
                key={i}
                className="
                  group
                  border border-slate-200 dark:border-slate-800 
                  hover:border-blue-500/70 hover:shadow-md
                  bg-white dark:bg-[#0f1629] 
                  transition-all duration-200
                  p-2
                "
              >
                <CardHeader className="space-y-3">
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center p-3 rounded-xl 
                    bg-blue-50 dark:bg-blue-950/40 border border-blue-200/40 dark:border-blue-900/40
                    group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition"
                  >
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Title */}
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                    {item.title}
                  </CardTitle>

                  {/* Description */}
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
