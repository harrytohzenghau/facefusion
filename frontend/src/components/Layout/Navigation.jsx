import { useEffect, useState } from "react";
import logo from "../../assets/facefusion_logo.png";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setShowMobileNav(false);
      }
    };

    // Call the function immediately to set the initial state
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-blue-9 to-blue-5 px-6 py-2">
      <div className="flex justify-between items-center w-4/5 mx-auto my-0 max-lg:w-full">
        <div className="flex items-center flex-shrink-0 text-white mr-6 w-14">
          <Link to="/">
            <img src={logo} alt="FaceFusion" />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-blue-1 border-blue-1 hover:text-white hover:border-white"
            onClick={() => setShowMobileNav((prevState) => !prevState)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:block w-full flex-grow lg:flex lg:items-center lg:justify-end lg:w-auto">
          <div className="flex justify-around items-center w-4/5 min-w-[680px] ml-0 my-0">
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
        </div>
      </div>
      {showMobileNav && (
        <div className="w-full mx-auto my-0 block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-md lg:flex-grow flex flex-col mt-4 gap-y-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2"
                  : "text-blue-2 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2";
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/sample"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2"
                  : "text-blue-2 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2";
              }}
            >
              Sample
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2"
                  : "text-blue-2 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2";
              }}
            >
              Pricing
            </NavLink>
          </div>
          {/* Spacer between groups */}
          <div className="flex flex-col mt-8 mb-4 gap-y-2">
            <NavLink
              to="/login"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2"
                  : "text-blue-2 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2";
              }}
            >
              Login
            </NavLink>
            <NavLink
              to="/sign-up"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2"
                  : "text-blue-2 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2";
              }}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
