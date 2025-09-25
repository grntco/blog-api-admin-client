import styles from "./Table.module.css";
import { Link } from "react-router";
import formatDate from "../../utils/formatDate";

const PostsTable = ({ posts }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title/Slug</th>
            <th>Author</th>
            <th>Last modified</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => {
            return (
              <tr key={index} post={post}>
                <td className={styles.postCol}>
                  <span>{post.title}</span>
                  <span className={styles.slug}>{post.slug}</span>
                </td>
                <td>
                  <Link to={`/users/${post.author.id}/edit`} className="grey">
                    {post.author.firstName + " " + post.author.lastName}
                  </Link>
                </td>
                <td>{formatDate(post.updatedAt)}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      post.published ? styles.published : ""
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td>
                  <Link className={"grey"} to={`/posts/${post.id}/edit`}>
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

export default PostsTable;
