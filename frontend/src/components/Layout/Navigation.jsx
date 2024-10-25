import logo from "../../assets/facefusion_logo.png";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="static top-0 w-full bg-gradient-to-r from-blue-9 to-blue-5 px-6 py-2">
      <div className="flex justify-between items-center w-4/5 min-w-[680px] mx-auto my-0">
        <div className="w-14">
          <Link to="/"><img src={logo} alt="FaceFusion" /></Link>
        </div>
        <ul className="flex gap-x-8">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sample"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              Sample
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              Pricing
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              Contact Us
            </NavLink>
          </li> */}
        </ul>
        <ul className="flex flex-end gap-x-8">
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-up"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
              }}
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
