// import { Link } from "react-router";
import styles from "./PostForm.module.css";
import useMutation from "../../hooks/api/useMutation";
import { useState } from "react";

const PostForm = ({ post = null }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [status, setStatus] = useState(post?.published ? "published" : "draft");
  const [content, setContent] = useState(post?.content || "");

  const { mutate, error, loading } = useMutation();
  const btnText = post ? "Update" : "Create Post";
  const btnLoadingText = post ? "Updating..." : "Creating...";
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await mutate(
        `http://localhost:3000/posts/${post.id}`,
        {
          title: title.trim(),
          slug: slug.trim(),
          published: status.trim() === "published",
          content: content.trim(),
        },
        {
          method: "PATCH",
        }
      );

      console.log(response);
      if (!error && response) {
        // do something like redirect...
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <form>
      <div className={styles.inputsContainer}>
        <div className={styles.flexCol}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            className={`${styles.input} ${styles.titleInput}`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.flexRow}>
          <label htmlFor="slug">Slug:</label>
          <input
            id="slug"
            className={`${styles.input} ${styles.slugInput}`}
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <div className={styles.flexRow}>
          <label htmlFor="status">Set status:</label>
          <select
            id="status"
            className={styles.statusSelect}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className={styles.flexCol}>
          <label htmlFor="content">Post content:</label>
          <textarea
            id="content"
            className={`${styles.input} ${styles.contentInput}`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
            {content}
          </textarea>
        </div>
        <div className={styles.btnsContainer}>
          <button className="btn" type="submit" onClick={handleSubmit}>
            {loading ? btnLoadingText : btnText}
          </button>
          {post && (
            <button className={`btn ${styles.deleteBtn}`}>
              Trash (permanent)
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PostForm;
