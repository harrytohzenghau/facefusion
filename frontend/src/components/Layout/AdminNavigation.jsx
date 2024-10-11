import logo from "../../assets/facefusion_logo.png";
import { NavLink } from "react-router-dom";

const AdminNavigation = () => {
  return (
    <nav className="static top-0 w-full bg-gradient-to-r from-blue-9 to-blue-5 px-6 py-2">
      <div className="flex justify-between items-center w-4/5 min-w-[680px] mx-auto my-0">
        <div className="w-14">
          <img src={logo} alt="FaceFusion" />
        </div>
        <ul className="flex gap-x-8">
          <li>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              User
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/admin-list"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/rating"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              Rating
            </NavLink>
          </li>
        </ul>
        <ul className="flex flex-end gap-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavigation;
