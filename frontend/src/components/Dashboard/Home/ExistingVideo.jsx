import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteContent,
  incrementDownloadCount,
} from "../../../services/AnimationService";
import { LoadingContext } from "../../../context/LoadingContext";

const ExistingVideo = ({ existingVideo }) => {
  const [videos, setVideos] = useState([]);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    setVideos(existingVideo);
  }, [existingVideo]);

  const handleDownload = async (video, contentId) => {
    try {
      // do increment download count before starting the download
      const result = await incrementDownloadCount(contentId);
      if (result.success) {
        console.log("Download count incremented successfully.");
      } else {
        console.error("Failed to increment download count:", result.message);
      }

      // start download
      const link = document.createElement("a");
      link.href = video;
      link.download = "video.mp4";
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error during download process:", error);
    }
  };

  const handleDelete = async (videoDetail) => {
    try {
      setIsLoading(true);
      const response = await deleteContent(videoDetail.contentId);

      if (!response.success) {
        return toast.error(response.message);
      }

      setVideos(videos.filter((_, i) => i !== videoDetail.index));
      setVideoToDelete(null); // Close confirmation modal after deletion
      setIsLoading(false);
      toast.success("Video removed successfully!");
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong when deleting a video!");
    }
  };

  // Function to prompt for delete confirmation
  const confirmDelete = (index, contentId) => {
    setVideoToDelete({ index, contentId }); // Set the image to delete when confirmed
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2">
        {videos.length > 0 &&
          videos.map((video, index) => (
            <div key={index} className="w-full">
              <div className="w-full">
                <video className="w-full my-0 mx-auto" controls>
                  <source src={video.fileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex justify-between mt-2 gap-x-2">
                <button
                  className="bg-blue-1 w-2/4 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
                  type="button"
                  onClick={() =>
                    handleDownload(video.fileUrl, video.content._id)
                  }
                >
                  Download
                </button>
                <button
                  className="bg-red-500 w-2/4 text-white px-4 py-2 rounded-lg hover:bg-red-300 transform transition-all duration-200 ease-in-out"
                  type="button"
                  onClick={() => confirmDelete(index, video.content._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      {videoToDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 modal-fade">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">
              Are you sure you want to delete this video?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(videoToDelete)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setVideoToDelete(null)} // Cancel deletion
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExistingVideo;
