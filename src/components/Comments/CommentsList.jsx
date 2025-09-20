import CommentItem from "./CommentItem";
import styles from "./Comment.module.css";

const CommentsList = ({ comments }) => {
  return comments.length > 0 ? (
    <ul className={styles.list}>
      {comments.map((comment, index) => {
        return <CommentItem key={index} comment={comment} />;
      })}
    </ul>
  ) : (
    <p className="info-text">No comments yet.</p>
  );
};

export default CommentsList;
