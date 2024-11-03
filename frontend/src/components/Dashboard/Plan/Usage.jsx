import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import { FaVideo } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { getImagesAndVideos } from "../../../services/AnimationService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Usage = () => {
  const user = useSelector((state) => state.auth.user);
  const [videoDownloadCount, setVideoDownloadCount] = useState();

  useEffect(() => {
    const getUsageDetails = async () => {
      try {
        const response = await getImagesAndVideos(user.id);
        if (!response.success) {
          return toast.error("Something went wrong when fetching user data.");
        }

        const existingVideo = response.data.content
          .filter((content, index) => content.file_type === "Video")
          .map((content, index) => ({
            content,
            fileUrl: response.data.fileUrl[index],
          }));

        const totalDownloadCount = existingVideo.reduce((sum, item) => {
          return sum + (item.content.download_count || 0);
        }, 0);

        setVideoDownloadCount(totalDownloadCount);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    getUsageDetails();
  }, [user.id]);

  return (
    <div className="flex flex-col justify-between gap-y-4 mt-4">
      <h2 className="text-xl font-bold">Usage</h2>
      <div className="flex gap-x-4 justify-between">
        <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
          <FaVideo size={32} />
          <h3>Videos Generate</h3>
          <h2 className="text-xl font-bold">3</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-blue-9">
            <div
              className="bg-blue-4 h-2.5 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
        </Card>
        <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg">
          <FaDownload size={32} />
          <h3>Videos Download</h3>
          <h2 className="text-xl font-bold">{videoDownloadCount}</h2>
        </Card>
      </div>
    </div>
  );
};

export default Usage;
