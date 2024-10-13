import { useNavigate } from "react-router-dom";
import Card from "../../components/UI/Card";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { deleteUser, editUser } from "../../services/AdminService";

const ProfileCard = ({ userData }) => {
  const [user, setUser] = useState();
  const [editPassword, setEditPassword] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    setUser(userData);
    setIsActive(!userData?.is_locked);
  }, [userData]);

  const toggleEditPasswordHandler = () => {
    setEditPassword((prevState) => !prevState);
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    const first_name = firstNameRef.current.value;
    const last_name = firstNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const is_locked = !isActive;

    let updatedUserData = {
      first_name,
      last_name,
      email,
      phone,
      is_locked,
    };

    if (editPassword) {
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (confirmPassword !== password) {
        return toast.error("Password does not matched.");
      }

      updatedUserData.password = password;
    }

    try {
      const response = await editUser(userData._id, updatedUserData);

      if (response.success) {
        toast.success("User has been updated");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  const toggleStatusHandler = () => {
    setIsActive((prevState) => !prevState);
  };

  const deleteUserHandler = async () => {
    try {
      const response = await deleteUser(userData._id);

      if (response.success) {
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
    <Card additionalClassName="flex flex-col gap-y-6 px-6 py-6 bg-white rounded-md drop-shadow-lg">
      <h1 className="font-bold text-xl">Update User</h1>
      <form onSubmit={updateProfileHandler} className="flex flex-col gap-y-6">
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>First Name</label>
            <input
              type="text"
              ref={firstNameRef}
              required
              defaultValue={user && user.first_name}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Last Name</label>
            <input
              type="text"
              ref={lastNameRef}
              required
              defaultValue={user && user.last_name}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Username</label>
            <input
              type="text"
              ref={usernameRef}
              disabled
              required
              defaultValue={user && user.username}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2">
            <div className="flex flex-col gap-y-4">
              <label>Status: <span className="font-bold">{isActive ? "Active" : "Inactive"}</span></label>
              <button
                type="button"
                onClick={toggleStatusHandler}
                className={`px-4 py-2 rounded-lg text-white ${
                  isActive
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                } transform transition-all duration-200 ease-in-out`}
              >
                {isActive ? "Deactivate User" : "Activate User"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              required
              defaultValue={user && user.email}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Phone Number</label>
            <input
              type="tel"
              ref={phoneRef}
              required
              defaultValue={user && user.phone}
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-1 px-4 py-2 rounded-md hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
            onClick={toggleEditPasswordHandler}
          >
            {editPassword ? "Cancel" : "Edit Password"}
          </button>
        </div>
        {editPassword && (
          <div className="flex gap-x-6">
            <div className="w-1/2 flex flex-col gap-y-4">
              <label>Password</label>
              <input
                type="password"
                ref={passwordRef}
                required
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-y-4">
              <label>Confirm Password</label>
              <input
                type="password"
                ref={confirmPasswordRef}
                required
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
          </div>
        )}
        <div className="flex ml-auto mt-4 gap-x-4">
          <button
            type="submit"
            className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
          >
            Update
          </button>
          <button
            type="button"
            onClick={deleteUserHandler}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-300 transform transition-all duration-200 ease-in-out"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-blue-7 px-4 py-2 rounded-lg hover:bg-blue-6 transform transition-all duration-200 ease-in-out"
          >
            Back
          </button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileCard;