import { useEffect, useState } from "react";
import Card from "../UI/Card";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRating, updateRatingStatus } from "../../services/AdminService";
import toast from "react-hot-toast";
import Modal from "react-modal"; // Import react-modal

Modal.setAppElement("#root");

const RatingCard = ({ ratingData }) => {
  const { id } = useParams();
  const [rating, setRating] = useState();
  const [isPublished, setIsPublished] = useState();
  const [modalOpen, setModalOpen] = useState(false); // Manage modal state

  const navigate = useNavigate();

  useEffect(() => {
    setRating(ratingData);
    setIsPublished(ratingData?.is_published);
  }, [ratingData]);

  const updateRatingStatusHandler = async () => {
    try {
      const response = await updateRatingStatus(id);

      if (response.success) {
        toast.success(
          `Rating has been ${isPublished ? "unpublished" : "published"}.`
        );
        setIsPublished((prevState) => !prevState);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  // Handle deletion of rating after confirmation
  const deleteRatingHandler = async () => {
    try {
      const response = await deleteRating(id);

      if (response.success) {
        toast.success("Rating has been deleted");
        navigate("/admin/rating");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  // Open the modal when the delete button is clicked
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Handle delete confirmation inside the modal
  const handleDeleteRating = () => {
    deleteRatingHandler(); // Call delete handler
    setModalOpen(false); // Close the modal
  };

  return (
    <>
      <Card additionalClassName="flex flex-col gap-y-6 px-6 py-6 bg-white rounded-md drop-shadow-lg max-lg:w-full">
        <h1 className="font-bold text-xl">View Rating</h1>
        <div className="flex flex-col gap-y-6">
          <div className="flex gap-x-6 gap-y-6 max-lg:flex-col">
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>Username</label>
              <input
                type="text"
                disabled
                defaultValue={rating && rating.user_id.username}
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>Email</label>
              <input
                type="text"
                disabled
                defaultValue={rating && rating.user_id.email}
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
          </div>
          <div className="flex gap-x-6 gap-y-6 max-lg:flex-col">
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>Name</label>
              <input
                type="text"
                disabled
                defaultValue={rating && rating.name}
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <div className="flex flex-col gap-y-4">
                <label>
                  Status:{" "}
                  <span className="font-bold">
                    {isPublished ? "Published" : "Not Published"}
                  </span>
                </label>
                <div
                  type="button"
                  className={`px-4 py-2 rounded-lg text-white ${
                    isPublished ? "bg-green-500" : "bg-red-500"
                  } transform transition-all duration-200 ease-in-out`}
                >
                  {isPublished ? "Published" : "Not Published"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6 gap-y-6 max-lg:flex-col">
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>Company Name</label>
              <input
                type="text"
                disabled
                defaultValue={rating && rating.company_name}
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>Occupation</label>
              <input
                type="text"
                disabled
                defaultValue={rating && rating.occupation}
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
          </div>
          <div className="flex gap-x-6 gap-y-6 max-lg:flex-col">
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>Rating</label>
              <input
                type="text"
                disabled
                defaultValue={rating && rating.rating}
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>Created At</label>
              <input
                type="text"
                disabled
                defaultValue={
                  rating &&
                  new Date(rating.created_at)
                    .toLocaleDateString("en-UK", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    .replace(",", "")
                }
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-4">
            <label>Feedback</label>
            <input
              type="textarea"
              disabled
              defaultValue={rating && rating.feedback}
              rows="4"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex ml-auto mt-4 gap-x-4">
            <button
              type="submit"
              className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
              onClick={updateRatingStatusHandler}
            >
              {isPublished ? "Unpublish" : "Publish"}
            </button>
            <button
              type="button"
              onClick={handleOpenModal} // Open the modal on click
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-300 transform transition-all duration-200 ease-in-out"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-blue-7 px-4 py-2 rounded-lg hover:bg-blue-6 transform transition-all duration-200 ease-in-out"
            >
              Back
            </button>
          </div>
        </div>
      </Card>

      {/* Modal for delete confirmation */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Rating Confirmation"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            padding: "20px",
            borderRadius: "10px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <h2 className="font-bold text-xl">Delete Rating</h2>
        <p className="mt-4">Are you sure you want to delete this rating?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteRating} // Call handleDeleteRating if confirmed
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default RatingCard;
