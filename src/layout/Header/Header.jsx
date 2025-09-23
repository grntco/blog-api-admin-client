import useAuth from "../../hooks/auth/useAuth";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    {
      path: "about",
      text: "About",
    },
    {
      path: "posts",
      text: "Posts",
    },
    {
      path: "comments",
      text: "Comments",
    },
    {
      path: "users",
      text: "Users",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/", {
      replace: true,
      state: { message: "Successfully logged out.", type: "success" },
    });
  };

  return (
    <header>
      <div className="container">
        <nav className={styles.nav}>
          <Link to={"/"} className={styles.logo}>
            Blog API - Admin Dashboard
          </Link>
          <ul className={styles.navList}>
            {navLinks.map((link, index) => {
              return (
                <li key={index}>
                  <Link className={styles.navLink} to={link.path}>
                    {link.text}
                  </Link>
                </li>
              );
            })}
            {user && isLoggedIn ? (
              <li>
                <button className={styles.navLink} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link className={styles.navLink} to={"login"}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
