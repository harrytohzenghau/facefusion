import Root from "../components/Layout/Root";
import UserRoot from "../components/Layout/UserRoot";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Guest/Home";
import Sample from "../pages/Guest/Sample";
import Login from "../pages/Guest/Login";
import SignUp from "../pages/Guest/SignUp";
import Contact from "../pages/Guest/Contact";
import Privacy from "../pages/Guest/Privacy";
import Pricing from "../pages/Guest/Pricing";
import DashboardHome from "../pages/User/DashboardHome";
import Library from "../pages/User/Library";
import CreateVideo from "../pages/User/CreateVideo";
import Profile from "../pages/User/Profile";
import Plan from "../pages/User/Plan";
import Rating from "../pages/User/Rating";

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
  {
    path: "/user",
    element: <UserRoot />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "create",
        element: <CreateVideo />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "plan",
        element: <Plan />,
      },
      {
        path: "rating",
        element: <Rating />,
      },
    ],
  },
]);

export default router;
