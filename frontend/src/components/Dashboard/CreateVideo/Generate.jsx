import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getImagesAndVideos } from "../../../services/AnimationService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Generate = ({ generateVideoHandler }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [audio, setAudio] = useState(null);
  const [voiceType, setVoiceType] = useState("male");
  const [expression, setExpression] = useState("happy");
  const [textInput, setTextInput] = useState("");

  const [existingImage, setExistingImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    updateExistingImageHandler();
  }, []);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(URL.createObjectURL(file));
      setTextInput(""); // Clear text input when audio is uploaded
    }
  };

  const handleRemoveAudio = () => {
    setAudio(null); // Remove audio file
  };

  const handleExpressionChange = (e) => setExpression(e.target.value);
  const handleVoiceTypeChange = (e) => setVoiceType(e.target.value);

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
    if (e.target.value) {
      setAudio(null); // Clear audio file when text input is entered
    }
  };

  const selectedImageHandler = (imageDetail) => {
    setSelectedImage(imageDetail);
    toast.success("This image has been selected!");
  };

  const generateVideoFormHandler = async (e) => {
    e.preventDefault();
    if (!selectedImage) return toast.error("Please select an image!");

    if (user.role === "Premium" && textInput && audio) {
      return toast.error(
        "Provide either a text input or an audio file, not both!"
      );
    }

    await generateVideoHandler(
      selectedImage,
      expression,
      voiceType,
      textInput,
      audio
    );
  };

  return (
    <>
      <form
        className="flex flex-col gap-y-10"
        onSubmit={generateVideoFormHandler}
      >
        <div className="flex gap-x-24 justify-around items-start">
          <div className="w-2/5 flex flex-col gap-y-4">
            {user.role === "Premium" && (
              <div className="flex flex-col gap-y-4">
                <label className="font-bold">Upload Audio:</label>
                <input
                  className="bg-white p-2 rounded-md drop-shadow-lg"
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  disabled={!!textInput} // Disable if text input is filled
                />
                {audio && (
                  <div className="flex items-center gap-x-4 mt-2">
                    <audio controls src={audio} className="mt-2" />
                    <button
                      onClick={handleRemoveAudio}
                      type="button"
                      className="text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
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
              <label className="font-bold">Choose Voice Type:</label>
              <select
                className="bg-white p-2 rounded-md drop-shadow-lg"
                value={voiceType}
                onChange={handleVoiceTypeChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
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
                disabled={!!audio} // Disable if audio is uploaded
              />
            </div>
          </div>
          <div className="w-3/5 flex flex-col gap-y-4">
            <label className="font-bold">Select an image:</label>
            <div className="flex gap-x-4 flex-wrap">
              {existingImage.length === 0 && (
                <div className="flex justify-between gap-x-6">
                  <p>
                    You have no image yet. You may go to library page and upload
                    now.
                  </p>
                  <button
                    onClick={() => navigate("/user/library")}
                    className="bg-blue-1 w-1/4 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
                  >
                    Upload image
                  </button>
                </div>
              )}
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
                          selectedImage &&
                          selectedImage.imageUrl === image.fileUrl
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-blue-1 text-white hover:bg-blue-2"
                        }`}
                      >
                        {selectedImage &&
                        selectedImage.imageUrl === image.fileUrl
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
