import styles from "./PostsList.module.css";
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
  const { page } = useParams();
  const url = `http://localhost:3000/posts${page ? `?page=${page}` : ""}`;
  const { data, error, loading } = useFetch(url);

  if (loading) return "loading...";
  if (error) return "error";

  const posts = data.posts ?? [];
  const currentPage = data.meta?.currentPage;
  const totalPages = data.meta?.totalPages;
  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.listContainer}>
      <ul className={styles.postsList}>
        {posts.map((post, index) => {
          return <PostItem key={index} post={post} />;
        })}
      </ul>
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
    </div>
  );
};

export default PostsList;
