import formatDate from "../../utils/formatDate";
import styles from "./Comment.module.css";

const CommentItem = ({ comment }) => {
  return (
    <li className={styles.comment}>
      <div className={styles.header}>
        <span className={styles.author}>
          {comment.author.firstName + " " + comment.author.lastName}
        </span>
        <span className={styles.date}>{formatDate(comment.createdAt)}</span>
      </div>
      <p className={styles.content}>{comment.content}</p>
    </li>
  );
};

export default CommentItem;
