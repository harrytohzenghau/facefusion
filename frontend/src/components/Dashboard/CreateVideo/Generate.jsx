import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getImages } from "../../../services/AnimationService";
import { useSelector } from "react-redux";

const Generate = ({ role, generateVideoHandler }) => {
  const user = useSelector((state) => state.auth.user);

  const [audio, setAudio] = useState(null);
  const [expression, setExpression] = useState("happy");
  const [textInput, setTextInput] = useState("");

  const [existingImage, setExistingImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image fileUrl

  // Fetch images on component mount
  const updateExistingImageHandler = async () => {
    try {
      const response = await getImages(user.id);
      if (!response.success) {
        return toast.error("Something went wrong when fetching user data.");
      }
      const existingImageList = response.data.content.map((content, index) => ({
        content,
        fileUrl: response.data.fileUrl[index],
      }));
      setExistingImage(existingImageList);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    updateExistingImageHandler();
  }, []);

  // Handle audio, expression, and text input changes
  const handleAudioUpload = (e) =>
    setAudio(URL.createObjectURL(e.target.files[0]));
  const handleExpressionChange = (e) => setExpression(e.target.value);
  const handleTextChange = (e) => setTextInput(e.target.value);

  // Set selected image and notify user
  const selectedImageHandler = (imageDetail) => {
    setSelectedImage(imageDetail);
    toast.success("This image has been selected!");
  };

  // Generate video form submission
  const generateVideoFormHandler = async (e) => {
    e.preventDefault();
    if (!selectedImage) return toast.error("Please select an image!");
    if (role === "Premium" && textInput && audio) {
      return toast.error(
        "Provide either a text input or an audio file in .mp3 format!"
      );
    }
    await generateVideoHandler(selectedImage, expression, textInput, audio);
  };

  return (
    <>
      <form
        className="flex flex-col gap-y-10"
        onSubmit={generateVideoFormHandler}
      >
        <div className="flex gap-x-24 justify-around items-start">
          <div className="w-2/5 flex flex-col gap-y-4">
            {role === "Premium" && (
              <div className="flex flex-col gap-y-4">
                <label className="font-bold">Upload Audio:</label>
                <input
                  className="bg-white p-2 rounded-md drop-shadow-lg"
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                />
                {audio && (
                  <audio controls src={audio} style={{ marginTop: "10px" }} />
                )}
              </div>
            )}
            <div className="flex flex-col gap-y-4">
              <label className="font-bold">Choose Expression:</label>
              <select
                className="bg-white p-2 rounded-md drop-shadow-lg"
                value={expression}
                onChange={handleExpressionChange}
              >
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-4">
              <label className="font-bold">Input Text:</label>
              <textarea
                className="bg-white p-2 rounded-md drop-shadow-lg"
                value={textInput}
                onChange={handleTextChange}
                rows="4"
                cols="50"
              />
            </div>
          </div>
          <div className="w-3/5 flex flex-col gap-y-4">
            <label className="font-bold">Select an image:</label>
            <div className="flex gap-x-4 flex-wrap">
              {existingImage &&
                existingImage.map((image, index) => (
                  <div key={index} className="w-[200px]">
                    <img
                      src={image.fileUrl}
                      alt={`Placeholder ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                    <div className="flex justify-between mt-2 gap-x-4">
                      <button
                        type="button"
                        onClick={() =>
                          selectedImageHandler({
                            imageUrl: image.fileUrl,
                            file_s3_key: image.content.file_s3_key,
                          })
                        }
                        className={`w-full py-2 rounded-lg transform transition-all duration-200 ease-in-out ${
                         selectedImage && selectedImage.imageUrl === image.fileUrl
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-blue-1 text-white hover:bg-blue-2"
                        }`}
                      >
                        {selectedImage &&  selectedImage.imageUrl === image.fileUrl
                          ? "Selected"
                          : "Select"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <button
          className="bg-blue-1 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
          type="submit"
        >
          Generate
        </button>
      </form>
    </>
  );
};

export default Generate;
