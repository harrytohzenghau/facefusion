import { useNavigate } from "react-router-dom";
import Card from "../../components/UI/Card";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { createUser } from "../../services/AdminService";
import { validatePassword } from "../../util/PasswordValidation";

const NewProfileCard = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const createProfileHandler = async (e) => {
    e.preventDefault();

    const first_name = firstNameRef.current.value;
    const last_name = firstNameRef.current.value;
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (confirmPassword !== password) {
      return toast.error("Password does not matched.");
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return toast.error(passwordError); // Show error message if password fails validation
    }

    let user_role_id;

    if (role === "admin") {
      user_role_id = 1;
    } else {
      user_role_id = 2;
    }

    const userData = {
      first_name,
      last_name,
      username,
      email,
      phone,
      password,
      user_role_id,
    };

    try {
      const response = await createUser(userData);

      if (response.success) {
        toast.success("User has been created");
        navigate("/admin");
      } else {
        return toast.error("Something went wrong");
      }
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <Card additionalClassName="flex flex-col gap-y-6 px-6 py-6 bg-white rounded-md drop-shadow-lg">
      <h1 className="font-bold text-xl">Create User</h1>
      <form onSubmit={createProfileHandler} className="flex flex-col gap-y-6">
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label className="font-bold">Select a Role:</label>
            <div className="flex gap-x-4">
              <label className="flex gap-x-2">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                />
                User
              </label>
              <label className="flex gap-x-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                Admin
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>First Name</label>
            <input
              type="text"
              ref={firstNameRef}
              required
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Last Name</label>
            <input
              type="text"
              ref={lastNameRef}
              required
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
              required
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2"></div>
        </div>
        <div className="flex gap-x-6">
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              required
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-4">
            <label>Phone Number</label>
            <input
              type="tel"
              ref={phoneRef}
              required
              className="bg-white px-4 py-2 rounded-md drop-shadow-lg"
            />
          </div>
        </div>
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
        <div className="flex ml-auto mt-4 gap-x-4">
          <button
            type="submit"
            className="bg-blue-1 text-white px-4 py-2 rounded-lg hover:bg-blue-2 transform transition-all duration-200 ease-in-out"
          >
            Create
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

export default NewProfileCard;
