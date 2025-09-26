import useFetch from "../../hooks/api/useFetch";

import { Link, useParams } from "react-router";
import PostForm from "../../components/Forms/PostForm/PostForm";
import getApiUrl from "../../utils/getApiUrl";

const EditPost = () => {
  const { postId } = useParams();
  const API_BASE_URL = getApiUrl();
  const url = `${API_BASE_URL}/posts/${postId}`;
  const { data, error, loading } = useFetch(url);

  const post = data;

  if (loading) return "loading...";
  if (error) return "Unable to retrieve post.";

  return (
    <section>
      <Link className="grey" to={"/posts"}>
        View all posts
      </Link>
      <h1>Edit Post</h1>
      <PostForm post={post} />
    </section>
  );
};

export default EditPost;
