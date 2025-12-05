import React, { useEffect } from "react";
import { Code2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/DarkMode";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import MobileSearch from "./MobileSearch";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess, error, isError }] =
    useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out");
      navigate("/login");
    }
    if (isError) {
      toast.error(error?.message || "Failed to log out");
    }
  }, [isSuccess, isError]);

  return (
    <div className="h-16 dark:bg-[#141414] bg-gray-50 border-b dark:border-gray-800 border-gray-300 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 dark:from-blue-400 dark:to-teal-300">
              <Code2 size={22} color="white" strokeWidth={2.4} />
            </div>
            <h1 className="hidden md:block font-extrabold text-2xl tracking-wide text-gray-900 dark:text-white">
              Code
              <span className="text-blue-600 dark:text-blue-400">Stack</span>
            </h1>
          </Link>
          {/* Links */}
          <div className="flex items-center gap-8 lg:gap-12 text-lg font-medium">
            <Link
              to="/course/search?query"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Explore
            </Link>
            <div className="mt-[1px]">
              <SearchBar></SearchBar>
            </div>
            {(!user || user?.role === "student") && (
              <Link
                to="/instructor"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Become Instructor
              </Link>
            )}
            {user?.role === "instructor" && (
              <Link
                to="/admin/dashboard"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Instructor Dashboard
              </Link>
            )}
            {user && (
              <Link
                to="/my-learning"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                My Learning
              </Link>
            )}
          </div>
        </div>

        {/* user icon and dark mode icon */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.photoUrl} alt="navbar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => navigate("/my-learning")}
                  >
                    My Learning
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => navigate("/profile")}
                  >
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="cursor-pointer"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => navigate("/admin/dashboard")}
                      className="cursor-pointer"
                    >
                      Dashboard
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="cursor-pointer"
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode></DarkMode>
        </div>
      </div>
      {/* Mobile Device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 dark:from-blue-400 dark:to-teal-300">
            <Code2 size={22} color="white" strokeWidth={2.4} />
          </div>
          <h1 className="font-extrabold text-xl tracking-wide text-gray-900 dark:text-white">
            Code
            <span className="text-blue-600 dark:text-blue-400">Stack</span>
          </h1>
        </Link>
        <MobileSearch></MobileSearch>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess, error, isError }] =
    useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out");
      navigate("/login");
    }
    if (isError) {
      toast.error(error?.message || "Failed to log out");
    }
  }, [isSuccess, isError, error, data]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu></Menu>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-6">
          <SheetTitle
            className="cursor-pointer text-xl font-semibold"
            onClick={() => navigate("/")}
          >
            CodeStack
          </SheetTitle>
          <DarkMode className="mr-10"></DarkMode>
        </SheetHeader>
        <Separator className="mr-2"></Separator>
        <nav className="flex flex-col space-y-4 ml-4">
          <SheetClose asChild>
            <Link to="/course/search?query" className="text-base font-medium">
              Explore
            </Link>
          </SheetClose>
          <Separator className="-mx-4"></Separator>
          {(!user || user?.role === "student") && (
            <>
              <SheetClose asChild>
                <Link to="/instructor" className="text-base font-medium">
                  Become Instructor
                </Link>
              </SheetClose>
              <Separator className="-mx-4"></Separator>
            </>
          )}
          {user ? (
            <>
              <SheetClose asChild>
                <Link to="/my-learning" className="text-base font-medium">
                  My Learning
                </Link>
              </SheetClose>
              <Separator className="-mx-4"></Separator>
              <SheetClose asChild>
                <Link to="/profile" className="text-base font-medium">
                  Edit Profile
                </Link>
              </SheetClose>
              <Separator className="-mx-4"></Separator>
              <SheetClose asChild>
                <button
                  className="text-left text-base font-medium cursor-pointer"
                  onClick={logoutHandler}
                >
                  Log out
                </button>
              </SheetClose>
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Link to="/login" className="text-base font-medium">
                  Login
                </Link>
              </SheetClose>
              <Separator className="-mx-4"></Separator>
              <SheetClose asChild>
                <Link to="/login" className="text-base font-medium">
                  Signup
                </Link>
              </SheetClose>
            </>
          )}
        </nav>
        {user?.role === "instructor" ? (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                className="cursor-pointer"
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button className="cursor-pointer" variant="outline">
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        ) : (
          <SheetFooter>
            <SheetClose asChild>
              <Button className="cursor-pointer">Close</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
