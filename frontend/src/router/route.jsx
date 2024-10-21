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
import AdminRoot from "../components/Layout/AdminRoot";
import UserList from "../pages/Admin/UserList";
import CreateUser from "../pages/Admin/CreateUser";
import EditUser from "../pages/Admin/EditUser";
import RatingList from "../pages/Admin/RatingList";
import ViewRating from "../pages/Admin/ViewRating";
import Thanks from "../pages/User/Thanks";
import AdminList from "../pages/Admin/AdminList";
import { AdminRoute, UserRoute } from "../util/ProtectedRoute";
import Success from "../pages/User/Success";
import { LoadingProvider } from "../context/LoadingContext";

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
    element: (
      <LoadingProvider>
        <UserRoot />
      </LoadingProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <UserRoute>
            <DashboardHome />
          </UserRoute>
        ),
      },
      {
        path: "create",
        element: (
          <UserRoute>
            <CreateVideo />
          </UserRoute>
        ),
      },
      {
        path: "library",
        element: (
          <UserRoute>
            <Library />
          </UserRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <UserRoute>
            <Profile />
          </UserRoute>
        ),
      },
      {
        path: "plan",
        element: (
          <UserRoute>
            <Plan />
          </UserRoute>
        ),
      },
      {
        path: "success",
        element: (
          <UserRoute>
            <Success />
          </UserRoute>
        ),
      },
      {
        path: "rating",
        element: (
          <UserRoute>
            <Rating />
          </UserRoute>
        ),
      },
      {
        path: "thanks",
        element: (
          <UserRoute>
            <Thanks />
          </UserRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        index: true,
        element: (
          <AdminRoute>
            <UserList />
          </AdminRoute>
        ),
      },
      {
        path: "admin-list",
        element: (
          <AdminRoute>
            <AdminList />
          </AdminRoute>
        ),
      },
      {
        path: "create",
        element: (
          <AdminRoute>
            <CreateUser />
          </AdminRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <AdminRoute>
            <EditUser />
          </AdminRoute>
        ),
      },
      {
        path: "rating",
        element: (
          <AdminRoute>
            <RatingList />
          </AdminRoute>
        ),
      },
      {
        path: "rating/:id",
        element: (
          <AdminRoute>
            <ViewRating />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
