import React from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="w-full bg-gray-200 dark:bg-background">
      <Separator />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight">CodeStack</h1>
          <p className="text-sm text-muted-foreground">Code with purpose.</p>
          {/* Navigation*/}
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">
            <Link
              to="/"
              onClick={scroll}
              className="hover:text-foreground transition"
            >
              Home
            </Link>
            <Link
              onClick={scroll}
              to="/my-learning"
              className="hover:text-foreground transition"
            >
              My Learning
            </Link>
            <Link
              to="/profile"
              onClick={scroll}
              className="hover:text-foreground transition"
            >
              Profile
            </Link>
            <Link
              to="/course/search"
              onClick={scroll}
              className="hover:text-foreground transition"
            >
              Search
            </Link>
          </div>
          <Separator className="my-6 w-full" />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CodeStack. all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
