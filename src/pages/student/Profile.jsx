import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      error,
      isSuccess,
      isError,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData?.message || "Profile updated");
      setOpen(false);
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  const user = data?.user;

  if (isLoading || !user) return <ProfileSkeleton></ProfileSkeleton>;

  const updateUserHandler = async () => {
    const formData = new FormData();

    if (name && name !== user.name) {
      formData.append("name", name);
    }

    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }
    await updateUser(formData);
  };

  const saveChnages = (name && name !== user?.name) || profilePhoto;

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src={user?.photoUrl} alt="avatar" />
            <AvatarFallback>Profile Photo</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.role?.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  ></Input>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={onChangeHandler}
                    className="col-span-3"
                  ></Input>
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={!saveChnages || updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium tex-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourse.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user?.enrolledCourse.map((course) => (
              <Course course={course} key={course._id}></Course>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const ProfileSkeleton = () => {
  const enrolledCourses = [1, 2];

  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      {/* Page Title */}
      <Skeleton className="h-8 w-48 mb-8 mx-auto md:mx-0 rounded-md" />

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        {/* Avatar */}
        <Skeleton className="h-32 w-32 rounded-full mb-4" />

        {/* Info */}
        <div className="flex-1 space-y-4 w-full">
          <Skeleton className="h-6 w-3/4 rounded-md" />
          <Skeleton className="h-6 w-1/2 rounded-md" />
          <Skeleton className="h-6 w-1/3 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md mt-2" /> {/* Button */}
        </div>
      </div>

      {/* Courses Section */}
      <div>
        <Skeleton className="h-6 w-64 mb-4 rounded-md" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {enrolledCourses.map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
