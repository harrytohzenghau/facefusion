import toast from "react-hot-toast";
import { getImagesAndVideos } from "../../../services/AnimationService";
import Card from "../../UI/Card";
import ExistingVideo from "../Library/ExistingVideo";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RecentVideos = () => {
  const user = useSelector((state) => state.auth.user);

  const [existingVideo, setExistingVideo] = useState([]);

  const updateExistingVideoHandler = async () => {
    try {
      const response = await getImagesAndVideos(user.id);

      if (!response.success) {
        return toast.error("Something went wrong when fetching user data.");
      }

      const existingVideoList = response.data.content
        .map((content, index) => {
          if (content.file_type === "Video") {
            return {
              content,
              fileUrl: response.data.fileUrl[index],
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      setExistingVideo(existingVideoList);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    updateExistingVideoHandler();
  }, []);

  return (
    <Card additionalClassName="flex flex-col gap-y-8">
      <h5 className="text-xl font-bold">Recent Videos</h5>
      <ExistingVideo existingVideo={existingVideo}/>
    </Card>
  );
};

export default RecentVideos;
