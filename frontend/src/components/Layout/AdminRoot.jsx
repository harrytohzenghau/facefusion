import AdminNavigation from "./AdminNavigation.jsx";

import { Outlet } from "react-router-dom";

const AdminRoot = () => {
  return (
    <div>
      <AdminNavigation />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminRoot;
