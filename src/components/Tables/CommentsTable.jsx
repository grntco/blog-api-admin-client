import styles from "./Table.module.css";
import { Link } from "react-router";
import formatDate from "../../utils/formatDate";

const CommentsTable = ({ comments }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Comment</th>
            <th>Author</th>
            <th>Post</th>
            <th>Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => {
            const truncatedContent =
              comment.content.length > 25
                ? comment.content.split("", 25).join("") + "..."
                : comment.content;

            return (
              <tr key={index}>
                <td>{truncatedContent}</td>
                <td>
                  <Link
                    to={`/users/${comment.author.id}/edit`}
                    className="grey"
                  >
                    {comment.author.firstName + " " + comment.author.lastName}
                  </Link>
                </td>
                <td>
                  <Link to={`/posts/${comment.post.id}/edit`} className="grey">
                    {comment?.post.title}
                  </Link>
                </td>
                <td>{formatDate(comment.updatedAt)}</td>
                <td>
                  <Link className={"grey"} to={`/comments/${comment.id}/edit`}>
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsTable;
