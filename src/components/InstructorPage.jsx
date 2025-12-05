import { Button } from "@/components/ui/button";
import { useBecomeInstructorMutation } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircle, GraduationCap } from "lucide-react";

const InstructorPage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const [becomeInstructor, { data, isSuccess, isError, error }] =
    useBecomeInstructorMutation();

  // If user already instructor
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "instructor") {
      navigate("/admin/dashboard");
    }
  }, [user]);

  const handleBecomeInstructor = async () => {
    await becomeInstructor();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);

      // show success message
      setShowSuccess(true);

      //  Redux updates role
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }

    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, data, error]);

  // Success message
  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center mt-28 animate-fadeIn">
        <CheckCircle className="text-green-500 h-16 w-16 animate-pulse" />
        <h1 className="text-3xl font-bold text-green-600 mt-4">
          Congratulations!
        </h1>
        <p className="text-gray-500 mt-2">
          You are now an Instructor. Redirecting to dashboard…
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6">
      <div className="flex items-center gap-3">
        <GraduationCap className="h-10 w-10 text-blue-600" />
        <h1 className="text-4xl font-bold">Become an Instructor</h1>
      </div>

      <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
        Empower millions of learners across the world by sharing your knowledge.
        Create courses, upload lectures, track student progress, and start
        earning — all from one instructor dashboard.
      </p>

      {/* Guidelines Section */}
      <div className="mt-8 bg-gray-100 dark:bg-gray-900 p-6 rounded-xl shadow-sm space-y-3">
        <h2 className="text-xl font-semibold mb-2">What you will get:</h2>

        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>✔ Full access to instructor dashboard</li>
          <li>✔ Ability to create & manage your courses</li>
          <li>✔ Upload HD video lectures</li>
          <li>✔ Track student enrollment & progress</li>
          <li>✔ Earn revenue from your students</li>
        </ul>
      </div>

      <Button
        className="mt-8 w-full md:w-auto text-lg py-6 px-10 cursor-pointer"
        onClick={handleBecomeInstructor}
      >
        Apply as Instructor
      </Button>
    </div>
  );
};

export default InstructorPage;
