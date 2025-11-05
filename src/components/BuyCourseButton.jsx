import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const navigate = useNavigate();

  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();

  useEffect(() => {
    if (isSuccess) {
      const transactionId = data?.data?.transactionId;
      const course = data?.data?.course;
      navigate(`/purchase/${transactionId}`, {
        state: { course, transactionId },
      });
    }

    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, isSuccess, isError, error]);

  const purchaseCourseHandler = () => {
    createCheckoutSession(courseId);
  };

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full cursor-pointer"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
