import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const useAutoLogout = (token) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        dispatch(logout());
        navigate("/login");
      } else {
        const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
        const timeoutId = setTimeout(() => {
          dispatch(logout());
          navigate("/login");
        }, timeUntilExpiry);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [token, dispatch, navigate]);
};

export default useAutoLogout;
