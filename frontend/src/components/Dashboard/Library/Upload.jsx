import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "../../../services/AnimationService";
import { LoadingContext } from "../../../context/LoadingContext";

const Upload = ({ updateExistingImageHandler }) => {
  const [images, setImages] = useState([]); // Array to hold multiple images
  const [imagePreviews, setImagePreviews] = useState([]); // Array for previews
  const { setIsLoading } = useContext(LoadingContext);

  const uploadImageHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    for (let i = 0; i < images.length; i++) {
      try {
        const response = await uploadImage(
          images[i].name,
          "Portraits",
          images[i]
        );

        if (!response.success) {
          setIsLoading(false);
          return toast.error(response.message);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Something went wrong when uploading an image!");
      }
    }

    setImages([]);
    setImagePreviews([]);
    setIsLoading(false);
    toast.success("Image uploaded successfully!");

    updateExistingImageHandler()
  };

  // Handle Multiple Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validImages = [];
    const previews = [];

    files.forEach((file) => {
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
          validImages.push(file); // Add the valid file to the array
          previews.push(URL.createObjectURL(file)); // Add the preview to the array
        } else {
          toast.error(
            `${file.name} is not a 500x500 image with valid extension (.JPG, .jpg, .jpeg, .png)`
          );
        }

        // Update state once all images are validated
        if (validImages.length > 0) {
          setImages((prevImages) => [...prevImages, ...validImages]);
          setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
        }
      };
    });
  };

  // Remove specific image
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    toast.success("Image removed successfully!");
  };

  // Remove all images
  const removeAllImages = () => {
    setImages([]);
    setImagePreviews([]);
    toast.success("All images removed successfully!");
  };

  return (
    <>
      <h1 className="font-bold text-xl mt-6">New image</h1>
      <form
        className="flex flex-col gap-y-10 mb-6"
        onSubmit={uploadImageHandler}
      >
        <div className="mt-6 flex justify-center bg-white rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload Images:</span>
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="sr-only"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  multiple // Allow multiple files
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              (500x500 PNG or JPG only)
            </p>
          </div>
        </div>

        {images.length > 0 && (
          <>
            <div className="flex flex-wrap gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={preview}
                    className="max-w-[200px] mb-2"
                    alt={`Uploaded Preview ${index + 1}`}
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="bg-red-500 w-full text-white px-4 py-2 rounded-lg hover:bg-red-300 transform transition-all duration-200 ease-in-out"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-y-6 w-full justify-between gap-x-8">
              <button
                className="bg-blue-1 w-2/4 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
                type="submit"
              >
                Upload
              </button>
              <button
                className="bg-red-500 w-2/4 text-white px-4 py-2 rounded-lg hover:bg-red-300 transform transition-all duration-200 ease-in-out"
                type="button"
                onClick={removeAllImages}
              >
                Remove All
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default Upload;
