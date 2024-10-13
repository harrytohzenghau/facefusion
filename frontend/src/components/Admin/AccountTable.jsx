/* eslint-disable react/prop-types */
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const AccountTable = ({
  allUsers,
  editUserHandler,
  banUserHandler,
  deleteUserHandler,
}) => {
  const navigate = useNavigate();

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
      name: "Plan",
      selector: (row) => {
        if (row.user_admin) {
          return "Premium";
        } else {
          return "Free";
        }
      },
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        if (!row.is_locked) {
          return "Active";
        } else {
          return "Inactive";
        }
      },
      sortable: true,
    },
    // {
    //   name: "Created At",
    //   selector: (row) => {
    //     const date = new Date(row.user_created);

    //     const day = date.getDate();
    //     const month = date.getMonth() + 1;
    //     const year = date.getFullYear();

    //     return `${day}/${month}/${year}`;
    //   },
    //   sortable: true,
    // },
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
              onClick={() => deleteUserHandler(row._id)}
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
      ></DataTable>
    </>
  );
};

export default AccountTable;
