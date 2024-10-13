import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-[17vw] px-10 py-6 h-auto min-h-screen text-white bg-blue-1 flex flex-col justify-between">
      <ul className="flex flex-col gap-y-3 my-3">
        <li>
          <Link to="/user">
            <h4 className="font-bold">Dashboard</h4>
          </Link>
        </li>
        <li>
          <Link
            to="/user/create"
            className="hover:text-blue-3 transform transition-all duration-200 ease-in-out hover:text-blue-5"
          >
            Create Video
          </Link>
        </li>
        <li>
          <Link
            to="/user/library"
            className="hover:text-blue-3 transform transition-all duration-200 ease-in-out hover:text-blue-5"
          >
            Library
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col gap-y-3 my-3">
        <li>
          <h4 className="font-bold">Settings</h4>
        </li>
        <li>
          <Link
            to="/user/profile"
            className="hover:text-blue-3 transform transition-all duration-200 ease-in-out hover:text-blue-5"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/user/plan"
            className="hover:text-blue-3 transform transition-all duration-200 ease-in-out hover:text-blue-5"
          >
            Plans & Billing
          </Link>
        </li>
        <li>
          <Link
            to="/user/rating"
            className="hover:text-blue-3 transform transition-all duration-200 ease-in-out hover:text-blue-5"
          >
            Rate Our Service
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col gap-y-3 my-3">
        <li>
          <button
            type="button"
            onClick={logoutHandler}
            className="hover:text-blue-3 transform transition-all duration-200 ease-in-out hover:text-blue-5"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;