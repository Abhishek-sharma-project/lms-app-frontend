import React, { useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput, courseByIdData }) => {
  useEffect(() => {
    if (courseByIdData?.course?.description) {
      setInput((prev) => ({
        ...prev,
        description: courseByIdData.course.description,
      }));
    }
  }, [courseByIdData, setInput]);

  const handleChange = (content) => {
    setInput((prev) => ({ ...prev, description: content }));
  };

  return (
    <ReactQuill
      theme="snow"
      value={input.description || ""}
      onChange={handleChange}
    />
  );
};

export default RichTextEditor;
