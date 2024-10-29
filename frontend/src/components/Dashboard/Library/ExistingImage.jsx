import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteContent } from "../../../services/AnimationService";

const ExistingImage = ({ existingImage, updateExistingImageHandler }) => {
  const [images, setImages] = useState([]);
  const [viewedImage, setViewedImage] = useState(null); // Store image to view
  const [imageToDelete, setImageToDelete] = useState(null); // Store the image to delete for confirmation

  useEffect(() => {
    setImages(existingImage);
  }, [existingImage]);

  // Function to remove an image
  const handleDelete = async (imageDetail) => {
    try {
      const response = await deleteContent(imageDetail.contentId);

      if (!response.success) {
        return toast.error(response.message);
      }

      setImages(images.filter((_, i) => i !== imageDetail.index));
      updateExistingImageHandler(
        images.filter((_, i) => i !== imageDetail.index)
      );
      setImageToDelete(null); // Close confirmation modal after deletion
      toast.success("Image removed successfully!");
    } catch (error) {
      toast.error("Something went wrong when uploading an image!");
    }
  };

  // Function to view an image
  const handleView = (image) => {
    setViewedImage(image);
  };

  // Function to close the image preview
  const closePreview = () => {
    setViewedImage(null);
  };

  // Function to prompt for delete confirmation
  const confirmDelete = (index, contentId) => {
    setImageToDelete({ index, contentId }); // Set the image to delete when confirmed
  };

  return (
    <div className="w-3/4">
      {/* Image Grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.length > 0 &&
          images.map((image, index) => (
            <div key={index} className="w-full">
              <img
                src={image.fileUrl}
                alt={`Placeholder ${index + 1}`}
                className="w-full max-w-1/5 h-auto object-cover"
              />
              <div className="flex justify-between mt-2 gap-x-4">
                <button
                  onClick={() => handleView(image)}
                  className="bg-blue-1 w-2/4 text-white py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
                >
                  View
                </button>
                <button
                  onClick={() => confirmDelete(index, image.content._id)}
                  className="bg-red-500 w-2/4 text-white px-4 py-2 rounded-lg hover:bg-red-300 transform transition-all duration-200 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Image Preview Modal */}
      {viewedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 modal-fade">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={viewedImage.fileUrl}
              alt="Viewed"
              className="w-[400px] object-cover mb-4"
            />
            <button
              onClick={closePreview}
              className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {imageToDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20 modal-fade">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">
              Are you sure you want to delete this image?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(imageToDelete)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setImageToDelete(null)} // Cancel deletion
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

export default ExistingImage;
