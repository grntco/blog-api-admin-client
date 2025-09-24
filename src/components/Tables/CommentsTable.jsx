import styles from "./Table.module.css";
import formatDate from "../../utils/formatDate";
import { Link } from "react-router";

const CommentsTable = ({ comments }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Comment</th>
            <th>On Post</th>
            <th>Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment, index) => {
            // console.log(comment.)
            return (
              <tr key={index}>
                <td>
                  {comment.author.firstName + " " + comment.author.lastName}
                </td>
                <td>{comment.content}</td>
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
