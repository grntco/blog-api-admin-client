import useFetch from "../../hooks/api/useFetch";
import { Link, useParams } from "react-router";
import UserForm from "../../components/Forms/UserForm/UserForm";

const EditUser = () => {
  const { userId } = useParams();
  const url = `http://localhost:3000/users/${userId}`;
  const { data, error, loading } = useFetch(url);

  const user = data;

  if (loading) return "loading...";
  if (error) return "Unable to retrieve user.";

  return (
    <section>
      <Link className="grey" to={"/users"}>
        View all users
      </Link>
      <h1>Edit User</h1>
      <p>Edit a user (e.g., make them an admin.)</p>
      <UserForm user={user} />
    </section>
  );
};

export default EditUser;
