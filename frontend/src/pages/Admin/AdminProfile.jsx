import Card from "../../components/UI/Card";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getOneUser } from "../../services/AdminService";
import { useSelector } from "react-redux";
import AdminProfileCard from "../../components/Admin/AdminProfileCard";

const AdminProfile = () => {
  const userDetails = useSelector((state) => state.auth.user);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getOneUser(userDetails.id);

        if (!response.success) {
          return toast.error("Something went wrong when fetching user data.");
        }

        setUser(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUser();
  }, [userDetails]);

  return (
    <Card additionalClassName="flex flex-col my-10 gap-y-6 px-6 py-6">
      <AdminProfileCard userData={user} />
    </Card>
  );
};

export default AdminProfile;
