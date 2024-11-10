import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Card from "../../UI/Card";
import { deleteProfile, editOwnProfile } from "../../../services/UserService";
import { validatePassword } from "../../../util/PasswordValidation";
import { LoadingContext } from "../../../context/LoadingContext";
import Modal from "react-modal"; // Import react-modal

const ProfileCard = ({ userData }) => {
  const [user, setUser] = useState();
  const [editPassword, setEditPassword] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const toggleEditPasswordHandler = () => {
    setEditPassword((prevState) => !prevState);
  };

  const deleteProfileHandler = async () => {
    try {
      setIsLoading(true);
      const response = await deleteProfile(userData._id);

      if (response.success) {
        setIsLoading(false);
        toast.success("Your account has been deleted");
        navigate("/");
      } else {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      return toast.error(error);
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    const first_name = firstNameRef.current.value;
    const last_name = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;

    let updatedUserData = {
      first_name,
      last_name,
      email,
      phone,
    };

    if (editPassword) {
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (confirmPassword !== password) {
        return toast.error("Password does not matched.");
      }

      const passwordError = validatePassword(password);
      if (passwordError) {
        return toast.error(passwordError); // Show error message if password fails validation
      }

      updatedUserData.password = password;
    }

    try {
      setIsLoading(true);
      const response = await editOwnProfile(userData._id, updatedUserData);

      if (response.success) {
        setIsLoading(false);
        toast.success("User has been updated");
      } else {
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      return toast.error(error);
    }
  };

  // Open the modal when the delete button is clicked
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleDeleteUser = () => {
    deleteProfileHandler(); // Call delete function
    setModalOpen(false); // Close modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close modal without action
  };

  return (
    <>
      <Card additionalClassName="flex flex-col gap-y-6 px-6 py-6 bg-white rounded-md drop-shadow-lg max-lg:w-full">
        <h1 className="font-bold text-xl">Update Profile</h1>
        <form onSubmit={updateProfileHandler} className="flex flex-col gap-y-6">
          <div className="flex gap-x-6 gap-y-6 max-lg:flex-col">
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>First Name</label>
              <input
                type="text"
                ref={firstNameRef}
                required
                defaultValue={user && user.first_name}
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
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
          <div className="flex gap-x-6 gap-y-6 max-lg:flex-col">
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
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
          </div>
          <div className="flex gap-x-6 gap-y-6 max-lg:flex-col">
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>Email</label>
              <input
                type="email"
                ref={emailRef}
                required
                defaultValue={user && user.email}
                className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
              <label>Phone Number</label>
              <input
                type="tel"
                ref={phoneRef}
                minLength={8}
                maxLength={8}
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
            <div className="flex gap-x-6 gap-y-6 max-lg:flex-col">
              <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
                <label>Password</label>
                <input
                  type="password"
                  ref={passwordRef}
                  required
                  className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
                />
              </div>
              <div className="w-1/2 flex flex-col gap-y-4 max-lg:w-full">
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
              onClick={handleOpenModal}
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
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete User Confirmation"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            padding: "20px",
            borderRadius: "10px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <h2 className="font-bold text-xl">Delete Account</h2>
        <p className="mt-4">Are you sure you want to delete your account?</p>
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

export default ProfileCard;
