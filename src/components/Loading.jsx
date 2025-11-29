import { useLoadUserQuery } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import React from "react";

const Loading = ({ children }) => {
  const { isLoading } = useLoadUserQuery();

  return (
    <div>{isLoading ? <LoadingSpinner></LoadingSpinner> : <>{children}</>}</div>
  );
};

export default Loading;

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Loader2 className="h-16 w-16 text-blue-500 dark:text-blue-400 animate-spin" />
    </div>
  );
};
