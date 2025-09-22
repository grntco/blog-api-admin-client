import styles from "./PostsTable.module.css";
import { Link, useParams } from "react-router";
import formatDate from "../../utils/formatDate";
import useFetch from "../../hooks/api/useFetch";

const PostItem = ({ post }) => {
  return (
    <li className={styles.post}>
      <Link to={`/blog/${post.id}/${post.slug}`} className={styles.link}>
        <span className={styles.date}>{formatDate(post.createdAt)}</span>
        <h3 className={styles.title}>{post.title}</h3>
      </Link>
    </li>
  );
};

const PostsList = () => {
  // add search capability and/or filter
  const { page } = useParams();
  const url = `http://localhost:3000/posts${page ? `?page=${page}` : ""}`;
  const { data, error, loading } = useFetch(url);

  if (loading) return "loading...";
  if (error) return "error";

  const posts = data.posts ?? [];
  // console.log(posts)

  const currentPage = data.meta?.currentPage;
  const totalPages = data.meta?.totalPages;
  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
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
                  <td>{post.title}</td>
                  <td>{post.author.firstName + " " + post.author.lastName}</td>
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
                    <Link
                      className={styles.editLink}
                      to={`/posts/${post.id}/edit`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ul className={styles.pagesList}>
        {pageNums.map((num, index) => {
          return (
            <li key={index}>
              <Link
                to={`/blog/${num}`}
                className={num === currentPage ? styles.active : ""}
              >
                {num}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PostsList;
