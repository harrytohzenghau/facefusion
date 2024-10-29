import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteContent } from "../../../services/AnimationService";

const ExistingVideo = ({ existingVideo }) => {
  const [videos, setVideos] = useState([]);
  const [videoToDelete, setVideoToDelete] = useState(null);

  useEffect(() => {
    setVideos(existingVideo);
  }, [existingVideo]);

  const handleDownload = (video) => {
    const link = document.createElement("a");
    link.href = video;
    link.download = "video.mp4"; // Set a default file name for download
    link.click();
  };

  const handleDelete = async (videoDetail) => {
    try {
      // const response = await deleteContent(videoDetail.contentId);

      // if (!response.success) {
      //   return toast.error(response.message);
      // }

      setVideos(videos.filter((_, i) => i !== videoDetail.index));
      // updateExistingImageHandler(
      //   images.filter((_, i) => i !== imageDetail.index)
      // );
      setVideoToDelete(null); // Close confirmation modal after deletion
      toast.success("Video removed successfully!");
    } catch (error) {
      toast.error("Something went wrong when uploading an image!");
    }
  };

  // Function to prompt for delete confirmation
  const confirmDelete = (index, contentId) => {
    setVideoToDelete({ index, contentId }); // Set the image to delete when confirmed
  };

  return (
    <>
      <div className="flex gap-x-4">
        {videos.length > 0 &&
          videos.map((video, index) => (
            <div className="w-2/6 flex flex-col gap-y-4" key={index}>
              <div className="w-full">
                <video className="w-full my-0 mx-auto" controls>
                  <source src={video.fileUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="w-full flex gap-x-4">
                <button
                  className="bg-blue-1 w-2/4 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
                  type="button"
                  onClick={() => handleDownload(video.fileUrl)}
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
    </>
  );
};

export default ExistingVideo;
