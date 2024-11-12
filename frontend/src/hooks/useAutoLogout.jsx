import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "../store/authSlice";

const useAutoLogout = (token) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        dispatch(logout());
        setRedirect(true);
      } else {
        const timeUntilExpiry = (decodedToken.exp - currentTime) * 1000;
        const timeoutId = setTimeout(() => {
          dispatch(logout());
          setRedirect(true);
        }, timeUntilExpiry);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [token, dispatch]);

  return redirect;
};

export default useAutoLogout;
