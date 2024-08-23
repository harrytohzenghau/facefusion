import Root from "../components/Layout/Root";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Sample from "../pages/Sample";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Pricing from "../pages/Pricing";

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
        path: "dashboard",
        element: <Dashboard />,
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
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
    ],
  },
]);

export default router;
