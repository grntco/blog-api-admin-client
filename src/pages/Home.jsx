import { Link } from "react-router";
import Alert from "../components/Alert/Alert";

const Home = () => {
  const USER_BLOG_URL = import.meta.env.VITE_ADMIN_BLOG_URL;

  return (
    <section>
      <Alert />
      <div className="content">
        <h1>Welcome to the Admin Dashboard!</h1>
        <p>
          This is a project created for The Odin Project&#39;s Node.js course to
          build an{" "}
          <a href="https://www.theodinproject.com/lessons/node-path-nodejs-blog-api">
            API server
          </a>{" "}
          and two front-end websites (this one and a public{" "}
          <a href={USER_BLOG_URL}>User Blog</a>) to make requests to the API
          endpoints to view and manage blog posts, comments, and users.
        </p>
        <p>
          The server is built with Node.js and Express, and both front-end sites
          in React.
        </p>
        <p>
          To learn more about the whole project and how it is built, visit the{" "}
          <Link to={"about"}>About</Link> page.
        </p>
      </div>
    </section>
  );
};

export default Home;
