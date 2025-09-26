import styles from "./CommentForm.module.css";
import useMutation from "../../../hooks/api/useMutation";
import { useNavigate } from "react-router";
import formatDate from "../../../utils/formatDate";
import { Link } from "react-router";
import getApiUrl from "../../../utils/getApiUrl";

// Only used in EditComment, since admins can't add new comments for users
const CommentForm = ({ comment = null }) => {
  const { mutate, error, loading } = useMutation();
  const navigate = useNavigate();
  const API_BASE_URL = getApiUrl();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const result = await mutate(
        `${API_BASE_URL}/comments/${comment?.id}`,
        {},
        { method: "DELETE" }
      );

      if (!error && result && result.success) {
        navigate("/comments", {
          replace: true,
          state: { message: result.message, type: "success" },
        });
      }
    } catch (err) {
      console.error("Error deleting comment:", err.message);
    }
  };

  return (
    <>
      {error && (
        <Alert
          alertMessage={error.error || error.message || "An error occurred."}
          alertType="error"
        />
      )}
      <button
        className={`btn ${styles.deleteBtn}`}
        onClick={(e) => {
          confirm("Are you sure you want to delete this comment?");
          handleDelete(e);
        }}
      >
        {loading ? "Deleting" : "Delete (permanent)"}
      </button>
      <div className={styles.commentContainer}>
        <div className={styles.flexRow}>
          <span>Date: </span>
          <span className={styles.date}> {formatDate(comment.createdAt)}</span>
        </div>
        <div className={styles.flexRow}>
          <span>Author: </span>{" "}
          <Link to={`/users/${comment.author.id}/edit`} className="grey">
            {comment.author.firstName + " " + comment.author.lastName}
          </Link>
        </div>
        <div className={styles.flexRow}>
          <span>On Post: </span>{" "}
          <Link to={`/posts/${comment.post.id}/edit`} className="grey">
            {comment.post.title}
          </Link>
        </div>
        <div className={styles.flexRow}>
          <span>Comment: </span>
          <p className={styles.content}>"{comment.content}"</p>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
