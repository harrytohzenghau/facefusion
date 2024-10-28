import { useEffect, useState } from "react";
import ExistingImage from "../../components/Dashboard/Library/ExistingImage";
import Upload from "../../components/Dashboard/Library/Upload";
import ExistingVideo from "../../components/Dashboard/Library/ExistingVideo";
import { Link } from "react-router-dom";
import { getImagesAndVideos } from "../../services/AnimationService";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Library = () => {
  const user = useSelector((state) => state.auth.user);
  const [toggleAddMoreImages, setToggleAddMoreImages] = useState(false);
  const [existingImage, setExistingImage] = useState([]);
  const [existingVideo, setExistingVideo] = useState([]);

  const updateExistingImageHandler = async () => {
    try {
      const response = await getImagesAndVideos(user.id);

      if (!response.success) {
        return toast.error("Something went wrong when fetching user data.");
      }

      const existingImageList = response.data.content
        .filter((content, index) => content.file_type === "Portraits")
        .map((content, index) => ({
          content,
          fileUrl: response.data.fileUrl[index],
        }));

      setExistingImage(existingImageList);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const updateExistingVideoHandler = async () => {
    try {
      const response = await getImagesAndVideos(user.id);

      if (!response.success) {
        return toast.error("Something went wrong when fetching user data.");
      }

      const existingImageList = response.data.content
        .filter((content, index) => content.file_type === "Video")
        .map((content, index) => ({
          content,
          fileUrl: response.data.fileUrl[index],
        }));

      setExistingImage(existingImageList);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    updateExistingImageHandler(); // Initial fetch
    updateExistingVideoHandler();
  }, []);

  return (
    <div className="mt-3">
      <h1 className="font-bold text-xl">Your image</h1>
      <div className="flex justify-between mt-6 items-start gap-x-6">
        {existingImage.length > 0 && (
          <ExistingImage
            existingImage={existingImage}
            updateExistingImageHandler={updateExistingImageHandler}
          />
        )}
        {existingImage.length === 0 && <h4>You have no image yet! Add now.</h4>}
        <button
          onClick={() => setToggleAddMoreImages((prevState) => !prevState)}
          className="bg-blue-1 w-1/4 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
        >
          Add more images
        </button>
      </div>
      {toggleAddMoreImages && (
        <Upload updateExistingImageHandler={updateExistingImageHandler} />
      )}
      <h1 className="font-bold text-xl mt-6">Your Video</h1>
      <div className="mt-6">
        {existingVideo.length === 0 && (
          <h4>
            You have no video yet! <Link to="/user/create">Create now.</Link>
          </h4>
        )}
        {existingVideo.length > 0 && <ExistingVideo />}
      </div>
    </div>
  );
};

export default Library;
