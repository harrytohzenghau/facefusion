import { useEffect, useState } from "react";
import ExistingImage from "../../components/Dashboard/Library/ExistingImage";
import Upload from "../../components/Dashboard/Library/Upload";
import ExistingVideo from "../../components/Dashboard/Library/ExistingVideo";
import { Link } from "react-router-dom";

const Library = () => {
  const [toggleAddMoreImages, setToggleAddMoreImages] = useState(false);
  const [existingImage, setExistingImage] = useState([]);
  const [existingVideo, setExistingVideo] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="mt-3">
      <h1 className="font-bold text-xl">Your image</h1>
      <div className="flex justify-between mt-6 items-start">
        {/* {existingImage.length > 0 && <ExistingImage />} */}
        {/* {existingImage.length === 0 && <h4>You have no image yet! Add now.</h4>} */}
        <ExistingImage />
        <button
          onClick={() => setToggleAddMoreImages((prevState) => !prevState)}
          className="bg-blue-1 w-1/4 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
        >
          Add more images
        </button>
      </div>
      {toggleAddMoreImages && <Upload />}
      <h1 className="font-bold text-xl mt-6">Your Video</h1>
      <div className="mt-6">
        {existingVideo.length === 0 && (
          <h4>You have no video yet! <Link to="/user/create">Create now.</Link></h4>
        )}
        {existingVideo.length > 0 && <ExistingVideo />}
      </div>
    </div>
  );
};

export default Library;
