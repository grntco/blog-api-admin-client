import { Link } from "react-router";
import Alert from "../components/Alert/Alert";

const Home = () => {
  return (
    <section>
      <Alert />
      <div className="content">
        <h1>Welcome to the blog!</h1>
        <p>
          Hi there! This is a blog project created for The Odin Project's
          Node.js course. The purpose of this project was to to create a REST
          API using Node.js and Express.
        </p>
        <p>
          While users of this blog are free to view posts and comments, they
          must create an account to post a comment (an action that calls an API
          endpoint that is restricted only to members of this blog).
        </p>
        <p>
          The same API is used by a different website for the admin dashboard.
          There, the admin (me) can create posts and manage users and comments.
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
