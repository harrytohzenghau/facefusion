import { useState } from "react";
import toast from "react-hot-toast";

const Upload = ({ role, generateVideoHandler }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [audio, setAudio] = useState(null);
  const [expression, setExpression] = useState("happy");
  const [textInput, setTextInput] = useState("");

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (
          (file.type === "image/JPG" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg" ||
            file.type === "image/png") &&
          img.width === 500 &&
          img.height === 500
        ) {
          setImage(file); // Save the actual file instead of the URL
          setImagePreview(URL.createObjectURL(file));
        } else {
          toast.error(
            "Please upload a 500x500 image with the following extension (.JPG, .jpg, .jpeg, .png)"
          );
          setImage(null);
          setImagePreview(null);
        }
      };
    }
  };

  // Handle Audio Upload
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudio(URL.createObjectURL(file));
    }
  };

  // Handle Expression Change
  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
  };

  // Handle Text Change
  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const generateVideoFormHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      return toast.error("Please upload an image!");
    }

    if (!expression) {
      return toast.error("Please select an expression!");
    }

    if (role === "Premium") {
      if (textInput && audio) {
        return toast.error(
          "Please provide either a text input or an audio file in .mp3 format!"
        );
      }
    }

    await generateVideoHandler(image, expression, textInput, audio);
  };

  return (
    <>
      <form
        className="flex flex-col gap-y-10"
        onSubmit={generateVideoFormHandler}
      >
        <div className="flex gap-x-24 justify-around items-start">
          <div className="w-3/5 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
              <label className="font-bold">
                Upload Image (500x500 PNG or JPG only):
              </label>
              <input
                className="bg-white p-2 rounded-md drop-shadow-lg"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
              />
            </div>
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
          <div className="w-2/5">
            {image && (
              <img
                src={imagePreview}
                className="w-[300px] h-[300px]"
                alt="Uploaded Preview"
              />
            )}
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

export default Upload;
