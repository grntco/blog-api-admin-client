import { Link } from "react-router";

const Error = ({ message }) => {
  return (
    <section>
      <div className="content">
        <h1>Error</h1>
        <p>{message ?? "An error occurred."}</p>
        <p>
          Go <Link to={"/"}>home</Link>.
        </p>
      </div>
    </section>
  );
};

export default Error;
