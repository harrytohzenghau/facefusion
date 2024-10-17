import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../store/authSlice";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const useAutoLogout = (token) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        dispatch(logout());
        toast.error("Your session has expired. Please login again.");
        <Navigate to="/login" replace />;
      } else {
        const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
        const timeoutId = setTimeout(() => {
          dispatch(logout());
          toast.error("Your session has expired. Please login again.");
          <Navigate to="/login" replace />;
        }, timeUntilExpiry);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [token, dispatch]);
};

export default useAutoLogout;
