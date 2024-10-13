import { useParams } from "react-router-dom";
import Card from "../../components/UI/Card";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getOneUser } from "../../services/AdminService";
import ProfileCard from "../../components/Admin/ProfileCard";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getOneUser(id);
        
        if(!response.success) {
          return toast.error("Something went wrong when fetching user data.")
        }

        setUser(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <Card additionalClassName="flex flex-col my-10 gap-y-6 px-6 py-6">
      <ProfileCard userData={user} />
    </Card>
  );
};

export default EditUser;
