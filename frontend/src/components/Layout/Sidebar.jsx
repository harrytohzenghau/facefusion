import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="max-w-[17vw] px-10 py-6 h-screen text-white bg-blue-1 flex flex-col justify-between">
      <ul className="flex flex-col gap-y-3 my-3">
        <li>
          <Link to="/user">
            <h4 className="font-bold">Dashboard</h4>
          </Link>
        </li>
        <li>
          <Link to="/user/create">Create Video</Link>
        </li>
        <li>
          <Link to="/user/library">Library</Link>
        </li>
      </ul>
      <ul className="flex flex-col gap-y-3 my-3">
        <li>
          <h4 className="font-bold">Settings</h4>
        </li>
        <li>
          <Link to="/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/user/plan">Plans & Billing</Link>
        </li>
        <li>
          <Link to="/user/rating">Rate Our Service</Link>
        </li>
      </ul>
      <ul className="flex flex-col gap-y-3 my-3">
        <li>
          <Link to="/">Log out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
