import { useEffect, useState } from "react";
import Card from "../../components/UI/Card";
import AccountTable from "../../components/Admin/AccountTable";
import { deleteUser, editUser, getAllUsers } from "../../services/AdminService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const [allAdmin, setAllAdmin] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();

        if (!response.success) {
          return toast.error("Something went wrong when fetching user data.");
        }

        let userList = [];

        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].user_role_id === 1) {
            userList.push(response.data[i]);
          }
        }
        setAllAdmin(userList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);

  const editUserHandler = async (userId) => {
    navigate(`/admin/edit/${userId}`);
  };

  const banUserHandler = async (userId, is_locked) => {
    const updatedLock = { is_locked: !is_locked };
    try {
      const response = await editUser(userId, updatedLock);

      if (response.success) {
        const updatedAdmin = allAdmin.map((user) => {
          if (user._id === userId) {
            return { ...user, is_locked: !is_locked };
          }
          return user;
        });

        setAllAdmin(updatedAdmin);
        toast.success("Admin has been updated");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  const deleteUserHandler = async (userId) => {
    try {
      const response = await deleteUser(userId);

      if (response.success) {
        const updatedAdmin = allAdmin.filter((admin) => admin._id !== userId);

        setAllAdmin(updatedAdmin);
        toast.success("User has been deleted");
        navigate("/admin");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <Card additionalClassName="my-10 flex flex-col gap-y-4 justify-between bg-white rounded-md p-6 drop-shadow-lg">
      <AccountTable
        allUsers={allAdmin}
        editUserHandler={editUserHandler}
        banUserHandler={banUserHandler}
        deleteUserHandler={deleteUserHandler}
      />
    </Card>
  );
};

export default AdminList;
