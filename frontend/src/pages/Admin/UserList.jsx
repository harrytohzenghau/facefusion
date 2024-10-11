import { useEffect, useState } from "react";
import Card from "../../components/UI/Card";
import AccountTable from "../../components/Admin/AccountTable";
import { getAllUsers } from "../../services/AdminService";

const UserList = () => {
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        const result = await response.json();
        setAllUsers(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);

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

export default UserList;
