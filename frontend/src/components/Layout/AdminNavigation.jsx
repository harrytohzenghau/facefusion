import { useDispatch } from "react-redux";
import logo from "../../assets/facefusion_logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const AdminNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    // <nav className="static top-0 w-full bg-gradient-to-r from-blue-9 to-blue-5 px-6 py-2">
    //   <div className="flex justify-between items-center w-4/5 min-w-[680px] mx-auto my-0">
    //     <div className="w-14">
    //       <img src={logo} alt="FaceFusion" />
    //     </div>
    //     <ul className="flex gap-x-8">
    //       <li>
    //         <NavLink
    //           to="/admin"
    //           end
    //           className={({ isActive }) => {
    //             return isActive
    //               ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
    //               : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
    //           }}
    //         >
    //           User
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/admin/admin-list"
    //           className={({ isActive }) => {
    //             return isActive
    //               ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
    //               : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
    //           }}
    //         >
    //           Admin
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink
    //           to="/admin/rating"
    //           className={({ isActive }) => {
    //             return isActive
    //               ? "text-blue-3 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
    //               : "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out";
    //           }}
    //         >
    //           Rating
    //         </NavLink>
    //       </li>
    //     </ul>
    //     <ul className="flex flex-end gap-x-8">
    //       <li>
    //         <button
    //           onClick={logoutHandler}
    //           className="text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
    //         >
    //           Logout
    //         </button>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
    <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-blue-9 to-blue-5 px-6 py-2">
      <div className="flex justify-between items-center w-4/5 mx-auto my-0 max-lg:w-full">
        <div className="flex items-center flex-shrink-0 text-white mr-6 w-14">
          <img src={logo} alt="FaceFusion" />
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
                <button
                  onClick={logoutHandler}
                  className={
                    "text-blue-2 font-bold hover:text-blue-3 transform transition-all duration-200 ease-in-out"
                  }
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showMobileNav && (
        <div className="w-full mx-auto my-0 block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-md lg:flex-grow flex flex-col mt-4 gap-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2"
                  : "text-blue-2 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2";
              }}
            >
              User
            </NavLink>
            <NavLink
              to="/admin/admin-list"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2"
                  : "text-blue-2 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2";
              }}
            >
              Admin
            </NavLink>
            <NavLink
              to="/admin/rating"
              className={({ isActive }) => {
                return isActive
                  ? "text-blue-3 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2"
                  : "text-blue-2 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2";
              }}
            >
              Rating
            </NavLink>
          </div>
          {/* Spacer between groups */}
          <div className="flex flex-col mt-8 mb-4 gap-y-2">
            <button
              onClick={logoutHandler}
              className={
                "text-left text-blue-2 font-bold hover:text-blue-3 hover:bg-blue-7 p-2 transform transition-all duration-200 ease-in-out border-b border-blue-3 pb-2"
              }
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavigation;
