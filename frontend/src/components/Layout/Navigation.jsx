import logo from "../../assets/facefusion_logo.png";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="static top-0 w-full bg-gradient-to-r from-blue-9 to-blue-5 px-6 py-2">
      <div className="flex justify-between items-center w-4/5 min-w-[680px] mx-auto my-0">
        <div className="w-14">
          <img src={logo} alt="FaceFusion" />
        </div>
        <ul className="flex gap-x-8">
          <li>
            <NavLink className="font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out hover:text-blue-3">Home</NavLink>
          </li>
          <li>
            <NavLink className="font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out">Sample</NavLink>
          </li>
          <li>
            <NavLink className="font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out">Pricing</NavLink>
          </li>
          <li>
            <NavLink className="font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out">Dashboard</NavLink>
          </li>
          <li>
            <NavLink className="font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out">Contact Us</NavLink>
          </li>
        </ul>
        <ul className="flex flex-end gap-x-8">
          <li>
            <NavLink className="font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out">Login</NavLink>
          </li>
          <li>
            <NavLink className="font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out">Sign Up</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
