import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Card from "../../components/UI/Card";
import AccountTable from "../../components/Admin/AccountTable";

const AdminList = () => {
  const [allUsers, setAllUsers] = useState([
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
    {
      username: "test",
      first_name: "test 1",
      last_name: "test 2",
      email_address: "test@test.com",
    },
  ]);

  const editUserHandler = () => {};
  const banUserHandler = () => {};
  const deleteUserHandler = () => {};

  return (
    <Card additionalClassName="my-10 flex flex-col gap-y-4 justify-between bg-white rounded-md p-6 drop-shadow-lg">
      <AccountTable
        allUsers={allUsers}
        editUserHandler={editUserHandler}
        banUserHandler={banUserHandler}
        deleteUserHandler={deleteUserHandler}
      />
    </Card>
  );
};

export default AdminList;
