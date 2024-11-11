import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getImagesAndVideos } from "../../../services/AnimationService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Generate = ({ generateVideoHandler }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [audio, setAudio] = useState(null);
  const audioInputRef = useRef(null); // Create ref for audio input
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
    if (audioInputRef.current) {
      audioInputRef.current.value = ""; // Clear the input value to allow re-upload
    }
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
      <p className="font-bold">
        * expect 10-20 mins of processing time for long audio and text, for fast
        rendering, do 2-3 sentences, or {`<`} 7 second audio.
      </p>
      <form
        className="flex flex-col gap-y-10"
        onSubmit={generateVideoFormHandler}
      >
        <div className="flex gap-x-20 justify-around items-start max-lg:flex-col max-lg:gap-y-4">
          <div className="w-2/5 flex flex-col gap-y-4 max-lg:w-full">
            {user.role === "Premium" && (
              <div className="flex flex-col gap-y-4">
                <label className="font-bold">Upload Audio:</label>
                <input
                  ref={audioInputRef}
                  className="bg-white p-2 rounded-md drop-shadow-lg"
                  type="file"
                  accept="audio/mpeg"
                  onChange={handleAudioUpload}
                  disabled={!!textInput || !!audio} // Disable if text input or audio is present
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
                required={user.role === "Free"}
                onChange={handleTextChange}
                rows="4"
                cols="50"
                disabled={!!audio} // Disable if audio is uploaded
              />
            </div>
          </div>
          <div className="w-3/5 flex flex-col gap-y-4 max-lg:w-full">
            <label className="font-bold">Select an image:</label>
            {existingImage.length === 0 && (
              <div className="flex justify-between gap-x-6 max-lg:flex-col max-lg:gap-y-4">
                <p>
                  You have no image yet. You may go to library page and upload
                  now.
                </p>
                <button
                  onClick={() => navigate("/user/library")}
                  className="bg-blue-1 w-1/4 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out max-lg:w-full"
                >
                  Upload image
                </button>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              {existingImage &&
                existingImage.map((image, index) => (
                  <div key={index} className="w-full">
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
