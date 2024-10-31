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
        .map((content, index) => ({
          ...content,
          fileUrl: response.data.fileUrl[index], // Add fileUrl to each content item
        }))
        .filter((item) => item.file_type === "Video") // Filter for videos only
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by created_at in descending order
        .slice(0, 3); // Take the top 3 most recent videos

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
      {existingVideo.length === 0 && <p>You have no video yet. Create now!</p>}
      <ExistingVideo existingVideo={existingVideo} />
    </Card>
  );
};

export default RecentVideos;
