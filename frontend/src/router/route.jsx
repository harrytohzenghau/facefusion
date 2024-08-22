import Root from "../components/Layout/Root";
import { createBrowserRouter } from "react-router-dom";
import Pricing from "../components/Pricing/Pricing";
import Home from "../pages/Home";
import Sample from "../pages/Sample";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "sample",
        element: <Sample />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      }
    ],
  },
]);

export default router;
