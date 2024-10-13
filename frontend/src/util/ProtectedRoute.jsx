import { Navigate } from "react-router-dom";
import store from "../store/store";

export const AdminRoute = ({ children }) => {
  const user = store.getState().auth.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "Admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const UserRoute = ({ children }) => {
  const user = store.getState().auth.user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
