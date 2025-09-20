import useFetch from "../hooks/api/useFetch";
import { useParams } from "react-router";
import PostContent from "../components/PostContent/PostContent";
import CommentsList from "../components/Comments/CommentsList";
import CommentForm from "../components/Comments/CommentForm";
import { useEffect, useState } from "react";
import Error from "./Error";

const Post = () => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const url = `http://localhost:3000/posts/${postId}`;
  const { data, error, loading } = useFetch(url);

  const post = data;

  useEffect(() => {
    if (post?.comments) {
      setComments(post.comments);
    }
  }, [post?.comments]);

  if (loading) return "loading...";
  if (error) return "Unable to retrieve post.";

  if (error) return <Error message={error?.message} />;

  return (
    <>
      <PostContent post={post} />
      <CommentsList comments={comments} />
      <CommentForm postId={postId} setComments={setComments} />
    </>
  );
};

export default Post;
