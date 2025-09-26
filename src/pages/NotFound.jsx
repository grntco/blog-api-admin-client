import { Link } from "react-router";

const NotFound = () => {
  return (
    <div>
      <section>
        <h1>404: Not Found</h1>
        <p>
          The page you are looking for does not exist. Please go{" "}
          <Link to={"/"}>home</Link>.
        </p>
      </section>
    </div>
  );
};

export default NotFound;
