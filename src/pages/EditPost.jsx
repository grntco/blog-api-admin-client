import useFetch from "../hooks/api/useFetch";

import { Link, useParams } from "react-router";
import PostForm from "../components/PostForm/PostForm";

const EditPost = () => {
  const { postId } = useParams();
  const url = `http://localhost:3000/posts/${postId}`;
  const { data, error, loading } = useFetch(url);

  const post = data;

  if (loading) return "loading...";
  if (error) return "Unable to retrieve post.";

  return (
    <section>
      <Link to={"/posts"}>View all posts</Link>
      <h1>Edit Post</h1>
      <PostForm post={post} />
    </section>
  );
};

export default EditPost;
