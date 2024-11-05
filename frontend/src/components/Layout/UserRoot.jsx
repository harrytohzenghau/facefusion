import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LoadingContext } from "../../context/LoadingContext";
import { useContext } from "react";

const UserRoot = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <div className="flex relative">
      <Sidebar />
      {isLoading && (
        <div className="fixed bg-white bg-opacity-60 z-30 h-fit min-h-screen w-full flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-3xl mr-4">Loading</span>
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      <main className="w-[85vw] ml-[12.5rem] h-fit min-h-screen flex-1 px-10 py-6 bg-gradient-to-r from-white to-blue-9">
        <Outlet />
      </main>
    </div>
  );
};

export default UserRoot;
