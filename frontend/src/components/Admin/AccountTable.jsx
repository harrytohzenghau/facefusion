import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal"; // Import react-modal

// Set the app element for accessibility (typically the root div)
Modal.setAppElement("#root");

const AccountTable = ({
  allUsers,
  editUserHandler,
  banUserHandler,
  deleteUserHandler,
  isAdmin = false,
}) => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [userToDelete, setUserToDelete] = useState(null); // Store user to delete

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

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => index + 1,
      width: "3rem",
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      width: "7rem",
    },
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Status",
      selector: (row) => {
        return row.is_locked ? "Inactive" : "Active";
      },
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div className="flex gap-x-2">
            <button
              type="button"
              className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
              onClick={() => editUserHandler(row._id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-blue-4 text-white px-4 py-2 rounded-lg hover:bg-blue-5 transform transition-all duration-200 ease-in-out"
              onClick={() => banUserHandler(row._id, row.is_locked)}
            >
              {!row.is_locked ? "Ban" : "Activate"}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-300 transform transition-all duration-200 ease-in-out"
              onClick={() => {
                setUserToDelete(row._id); // Set user to delete
                setModalOpen(true); // Open modal
              }}
            >
              Delete
            </button>
          </div>
        );
      },
      width: "25rem",
    },
  ];

  if (!isAdmin) {
    columns.splice(5, 0, {
      name: "Plan",
      selector: (row) => {
        switch (row.user_role_id) {
          case 2:
            return "Free";
          case 3:
            return "Premium";
          default:
            return "Unknown";
        }
      },
      sortable: true,
    });
  }

  const handleDeleteUser = () => {
    if (userToDelete) {
      deleteUserHandler(userToDelete); // Call delete function
      setUserToDelete(null); // Reset user to delete
      setModalOpen(false); // Close modal
    }
  };

  const closeModal = () => {
    setModalOpen(false); // Close modal without action
    setUserToDelete(null); // Reset user to delete
  };

  return (
    <>
      <div>
        <button
          className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
          onClick={() => {
            navigate("/admin/create");
          }}
        >
          Create
        </button>
      </div>

      <DataTable
        columns={columns}
        data={allUsers}
        customStyles={customStyles}
        pagination
      />

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete User Confirmation"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            padding: '20px',
            borderRadius: '10px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <h2 className="font-bold text-xl">Delete User</h2>
        <p className="mt-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AccountTable;
