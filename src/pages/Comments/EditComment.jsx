import useFetch from "../../hooks/api/useFetch";
import { Link, useParams } from "react-router";
import CommentForm from "../../components/Forms/CommentForm/CommentForm";
import getApiUrl from "../../utils/getApiUrl";

const EditComment = () => {
  const { commentId } = useParams();
  const API_BASE_URL = getApiUrl();
  const url = `${API_BASE_URL}/comments/${commentId}`;
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
