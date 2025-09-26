import { Outlet, useLocation, Navigate } from "react-router";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import useAuth from "../hooks/auth/useAuth.jsx";

const Layout = () => {
  const { user, isLoggedIn, loading } = useAuth();
  const location = useLocation();

  const publicRoutes = ["/", "/about", "/login"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (loading) return "loading...";

  return (
    <>
      <Header />
      <main>
        <div className="container">
          {(!user || !isLoggedIn) && !isPublicRoute ? (
            <Navigate to="/login" replace />
          ) : (
            <Outlet />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
