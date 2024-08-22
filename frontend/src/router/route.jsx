import Root from "../components/Layout/Root";
import { createBrowserRouter } from "react-router-dom";
import Pricing from "../components/Pricing/Pricing";
import Home from "../pages/Home";

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
    ],
  },
]);

export default router;
