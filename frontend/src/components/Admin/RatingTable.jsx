import DataTable from "react-data-table-component";

const RatingTable = ({
  title,
  allRatings,
  viewRatingHandler,
  deleteRatingHandler,
}) => {
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Company Name",
      selector: (row) => row.company_name,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Occupation",
      selector: (row) => row.occupation,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
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
              onClick={() => deleteRatingHandler(row._id)}
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
      ></DataTable>
    </div>
  );
};

export default RatingTable;
