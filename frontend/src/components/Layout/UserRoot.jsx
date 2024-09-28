import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const UserRoot = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-10 py-6 bg-gradient-to-r from-white to-blue-9">
        <Outlet />
      </main>
    </div>
  );
};

export default UserRoot;
