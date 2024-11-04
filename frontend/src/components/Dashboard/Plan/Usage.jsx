import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import { FaVideo } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { getImagesAndVideos } from "../../../services/AnimationService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Usage = () => {
  const user = useSelector((state) => state.auth.user);
  const [imageUploadCount, setImageUploadCount] = useState(0);
  const [videoGenerateCount, setVideoGenerateCount] = useState();
  const [videoDownloadCount, setVideoDownloadCount] = useState();

  const maxImagesAllowed = user.role === "Free" && 3;
  const maxVideosAllowed = user.role === "Premium" ? 3 : 10;

  useEffect(() => {
    const getUsageDetails = async () => {
      try {
        const response = await getImagesAndVideos(user.id);
        if (!response.success) {
          return toast.error("Something went wrong when fetching user data.");
        }

        const existingImage = response.data.content
          .map((content, index) => {
            if (content.file_type === "Portraits") {
              return {
                content,
                fileUrl: response.data.fileUrl[index],
              };
            }
            return null;
          })
          .filter((item) => item !== null);

        const existingVideo = response.data.content
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

        const totalDownloadCount = existingVideo.reduce((sum, item) => {
          return sum + (item.content.download_count || 0);
        }, 0);

        console.log(existingImage.length);

        setImageUploadCount(existingImage.length);
        setVideoGenerateCount(existingVideo.length);
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
      <div className="flex gap-x-4 justify-between max-lg:flex-col max-lg:gap-y-6">
        <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg max-lg:w-full">
          <FaVideo size={32} />
          <h3>Images Upload</h3>
          <h2 className="text-xl font-bold">
            {user.role === "Free" &&
              `${imageUploadCount} / ${maxImagesAllowed}`}
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-blue-9">
            <div
              className="bg-blue-4 h-2.5 rounded-full"
              style={{
                width: `calc(${
                  Math.min(imageUploadCount / maxImagesAllowed, 1) * 100
                }%)`,
              }}
            ></div>
          </div>
        </Card>
        <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg max-lg:w-full">
          <FaVideo size={32} />
          <h3>Videos Generate</h3>
          <h2 className="text-xl font-bold">
            {videoGenerateCount} / {maxVideosAllowed}
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-blue-9">
            <div
              className="bg-blue-4 h-2.5 rounded-full"
              style={{
                width: `calc(${
                  Math.min(videoGenerateCount / maxVideosAllowed, 1) * 100
                }%)`,
              }}
            ></div>
          </div>
        </Card>
        <Card additionalClassName="flex flex-col gap-y-2 px-4 py-4 bg-white rounded-md drop-shadow-lg max-lg:w-full">
          <FaDownload size={32} />
          <h3>Videos Download</h3>
          <h2 className="text-xl font-bold">{videoDownloadCount}</h2>
        </Card>
      </div>
    </div>
  );
};

export default Usage;
