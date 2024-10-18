import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
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
    <div className="w-[12.5rem] fixed h-screen text-white bg-blue-1 flex flex-col justify-between">
      <ul className="flex flex-col gap-y-3 m-8">
        <li>
          <NavLink to="/user">
            <h4 className="font-bold">Dashboard</h4>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/create"
            className={({ isActive }) => {
              return isActive
                ? "text-blue-5"
                : "hover:text-blue-5 transform transition-all duration-200 ease-in-out";
            }}
          >
            Create Video
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/library"
            className={({ isActive }) => {
              return isActive
                ? "text-blue-5"
                : "hover:text-blue-5 transform transition-all duration-200 ease-in-out";
            }}
          >
            Library
          </NavLink>
        </li>
      </ul>
      <ul className="flex flex-col gap-y-3 m-8">
        <li>
          <h4 className="font-bold">Settings</h4>
        </li>
        <li>
          <NavLink
            to="/user/profile"
            className={({ isActive }) => {
              return isActive
                ? "text-blue-5"
                : "hover:text-blue-5 transform transition-all duration-200 ease-in-out";
            }}
          >
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/plan"
            className={({ isActive }) => {
              return isActive
                ? "text-blue-5"
                : "hover:text-blue-5 transform transition-all duration-200 ease-in-out";
            }}
          >
            Plans & Billing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user/rating"
            className={({ isActive }) => {
              return isActive
                ? "text-blue-5"
                : "hover:text-blue-5 transform transition-all duration-200 ease-in-out";
            }}
          >
            Rate Our Service
          </NavLink>
        </li>
      </ul>
      <ul className="flex flex-col gap-y-3 m-8">
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
