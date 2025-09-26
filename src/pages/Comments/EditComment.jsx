import useFetch from "../../hooks/api/useFetch";
import { Link, useParams } from "react-router";
import CommentForm from "../../components/Forms/CommentForm/CommentForm";

const EditComment = () => {
  const { commentId } = useParams();
  const url = `http://localhost:3000/comments/${commentId}`;
  const { data, error, loading } = useFetch(url);

  const comment = data;

  if (loading) return "loading...";
  if (error) return "Unable to retrieve comment.";

  return (
    <section>
      <Link className="grey" to={"/comments"}>
        View all comments
      </Link>
      <h1>Edit Comment</h1>
      <p>Moderate this comment by deleting it if it's inappropriate.</p>
      <CommentForm comment={comment} />
    </section>
  );
};

export default EditComment;
