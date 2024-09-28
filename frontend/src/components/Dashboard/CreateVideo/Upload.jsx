import { useState } from "react";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [expression, setExpression] = useState("happy");
  const [textInput, setTextInput] = useState("");
  const [imageError, setImageError] = useState("");

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (
          (file.type === "image/png" || file.type === "image/jpeg") &&
          img.width === 500 &&
          img.height === 500
        ) {
          setImage(URL.createObjectURL(file));
          setImageError("");
        } else {
          setImageError("Please upload a 500x500 PNG or JPG image.");
          setImage(null);
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

  const generateVideoHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col gap-y-10" onSubmit={generateVideoHandler}>
      <div className="flex gap-x-24 justify-around items-center">
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
            {imageError && <p style={{ color: "red" }}>{imageError}</p>}
          </div>
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
          {image && <img src={image} alt="Uploaded Preview" />}
        </div>
      </div>
      <button className="bg-blue-1 text-white py-2 rounded-lg" type="submit">Generate</button>
    </form>
  );
};

export default Upload;
