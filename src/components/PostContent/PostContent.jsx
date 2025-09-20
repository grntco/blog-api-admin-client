import formatDate from "../../utils/formatDate";
import styles from "./PostContent.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PostContent = ({ post }) => {
  return (
    <article>
      <div className={styles.header}>
        <div className={styles.date}>{formatDate(post.createdAt)}</div>
        <h1>{post.title}</h1>
        <div className={styles.author}>
          By {post.author.firstName + " " + post.author.lastName}
        </div>
      </div>
      <div className={styles.content}>
        <ReactMarkdown children={post.content} remarkPlugins={remarkGfm} />
      </div>
    </article>
  );
};

export default PostContent;
