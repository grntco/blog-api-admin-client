import { Outlet } from "react-router";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
