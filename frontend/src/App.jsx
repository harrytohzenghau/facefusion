import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/route";
import { useSelector } from "react-redux";
import useAutoLogout from "./hooks/useAutoLogout.jsx";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const token = useSelector((state) => state.auth.token);
  const redirect = useAutoLogout(token);

  useEffect(() => {
    if (redirect) {
      window.location.href = "/login";
    }
  }, [redirect]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
