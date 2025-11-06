import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = import.meta.env.VITE_MEDIA_API;

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const { courseId, lectureId } = params;

  const [editLecture, { data, isError, isSuccess, error, isLoading }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();
  const { data: lectureData, refetch } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture?.lectureTitle);
      setIsFree(lecture?.isPreviewFree);
      setUploadVideoInfo({
        videoUrl: lecture?.videoUrl,
        publicId: lecture.publicId,
      });
      setPreviewVideo(lecture?.videoUrl);
    }
  }, [lecture]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewVideo(URL.createObjectURL(file)); // show before upload
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          setPreviewVideo(res.data.data.url); // show after upload
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };
  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [data, isSuccess, isError, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message);
      navigate(`/admin/course/${courseId}/lecture`);
    }
  }, [removeSuccess]);

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make Changes and click save when you are done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={removeLectureHandler}
            className="cursor-pointer"
            variant="destructive"
            disabled={removeLoading}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "  Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Label className="mx-1">Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Eg. Introduction to React JS"
          />
        </div>
        <div className="my-5 flex flex-col gap-2">
          <Label className="mx-1">Video</Label>
          <Input
            type="file"
            accept="video/*"
            placeholder="Eg. Introduction to React JS"
            className="w-fit cursor-pointer"
            onChange={fileChangeHandler}
          />
        </div>
        {previewVideo && (
          <div className="my-4">
            <p className="mb-2 font-medium">Video Preview:</p>
            <video
              src={previewVideo}
              controls
              width="300"
              className="rounded"
            />
          </div>
        )}
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="free"
            checked={isFree}
            onCheckedChange={setIsFree}
            className="cursor-pointer"
          />
          <Label htmlFor="free">Is this video Free ?</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress}></Progress>
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button
            disabled={isLoading || mediaProgress}
            onClick={editLectureHandler}
            className="cursor-pointer"
          >
            {isLoading || mediaProgress ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              " Update Lecture "
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
