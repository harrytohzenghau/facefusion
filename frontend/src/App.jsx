import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/route";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import useAutoLogout from "./hooks/useAutoLogout.jsx";

function App() {
  const token = useSelector((state) => state.auth.token);

  useAutoLogout(token);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
