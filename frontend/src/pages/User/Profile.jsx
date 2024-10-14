import { useEffect, useState } from "react";
import ProfileCard from "../../components/Dashboard/Profile/ProfileCard";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getOwnProfile } from "../../services/UserService";

const Profile = () => {
  const id = useSelector((state) => state.auth.user.id);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getOwnProfile(id);

        if (!response.success) {
          return toast.error("Something went wrong when fetching user data.");
        }

        setUser(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className="mt-3 flex flex-col gap-y-10">
      <ProfileCard userData={user} />
    </div>
  );
};

export default Profile;
