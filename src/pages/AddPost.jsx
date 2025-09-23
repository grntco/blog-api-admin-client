import { Link } from "react-router";
import PostForm from "../components/PostForm/PostForm";

const AddPost = () => {
  return (
    <section>
      <Link className="grey" to={"/posts"}>
        View all posts
      </Link>
      <h1>Add New Post</h1>
      <PostForm />
    </section>
  );
};

export default AddPost;
