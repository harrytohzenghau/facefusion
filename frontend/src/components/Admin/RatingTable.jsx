import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaStar } from "react-icons/fa";
import Modal from "react-modal"; // Import react-modal

Modal.setAppElement("#root"); // Set root element for accessibility

const RatingTable = ({ title, allRatings, viewRatingHandler, deleteRatingHandler }) => {
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [ratingToDelete, setRatingToDelete] = useState(null); // Track rating to delete

  const customStyles = {
    table: {
      style: {
        fontFamily: "Inter, sans-serif",
        fontSize: "1.4rem !important",
      },
    },
    headCells: {
      style: {
        padding: "0 0.8rem",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        padding: "0 0.8rem",
      },
    },
  };

  // Open the delete confirmation modal
  const openModal = (ratingId) => {
    setRatingToDelete(ratingId);
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setRatingToDelete(null); // Clear the rating to delete
  };

  // Handle the actual deletion after confirmation
  const confirmDeleteRating = () => {
    if (ratingToDelete) {
      deleteRatingHandler(ratingToDelete); // Call delete handler with selected ratingId
      setModalOpen(false); // Close modal after deletion
    }
  };

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "3rem",
    },
    {
      name: "Username",
      selector: (row) => row.user_id.username,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Email",
      selector: (row) => row.user_id.email,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Company Name",
      selector: (row) => row.company_name,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Created At",
      selector: (row) =>
        new Date(row.created_at)
          .toLocaleDateString("en-UK", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(",", ""),
      sortable: true,
      width: "7rem",
    },
    {
      name: "Rating",
      selector: (row) => (
        <div className="flex items-center">
          <span className="mr-1">{row.rating}</span>
          <FaStar className="text-blue-1" />
        </div>
      ),
      sortable: true,
      width: "5rem",
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex gap-x-2">
            <button
              type="button"
              className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
              onClick={() => viewRatingHandler(row._id)}
            >
              View
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-300 transform transition-all duration-200 ease-in-out"
              onClick={() => openModal(row._id)} // Open modal on delete
            >
              Delete
            </button>
          </div>
        );
      },
      width: "25rem",
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-xl">{title}</h1>
      <DataTable
        columns={columns}
        data={allRatings}
        customStyles={customStyles}
        pagination
      />

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
            onClick={confirmDeleteRating} // Call confirm delete on click
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RatingTable;
