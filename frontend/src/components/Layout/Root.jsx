import Footer from "./Footer.jsx";
import Navigation from "./Navigation.jsx";

import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
