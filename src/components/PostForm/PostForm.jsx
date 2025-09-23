// import { Link } from "react-router";
import styles from "./PostForm.module.css";
import useMutation from "../../hooks/api/useMutation";
import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router";

const PostForm = ({ post = null }) => {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [status, setStatus] = useState(post?.published ? "published" : "draft");
  const [content, setContent] = useState(post?.content || "");

  const { mutate, error, loading } = useMutation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const btnText = post ? "Update" : "Create Post";
  const btnLoadingText = post ? "Updating..." : "Creating...";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    try {
      const url = post
        ? `http://localhost:3000/posts/${post.id}`
        : `http://localhost:3000/posts`;

      const data = post
        ? {
            title: title.trim(),
            slug: slug.trim(),
            published: status.trim() === "published",
            content: content.trim(),
          }
        : {
            authorId: user.id,
            title: title.trim(),
            slug: slug.trim(),
            published: status.trim() === "published",
            content: content.trim(),
          };

      const result = await mutate(url, data, {
        method: post ? "PATCH" : "POST",
      });

      console.log(result);
      if (!error && result && result.success) {
        navigate("/posts", {
          replace: true,
          state: { message: result.message, type: "success" },
        });
      }
    } catch (err) {
      console.error(`Error ${post ? "editing" : "adding"} post:`, err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const result = await mutate(
        `http://localhost:3000/posts/${post?.id}`,
        {},
        { method: "DELETE" }
      );

      console.log(result);
      if (!error && result && result.success) {
        navigate("/posts", {
          replace: true,
          state: { message: result.message, type: "success" },
        });
      }
    } catch (err) {
      console.error("Error deleting post:", err.message);
    }
  };

  return (
    <form>
      <div className={styles.btnsContainer}>
        <button className="btn" type="submit" onClick={handleSubmit}>
          {loading ? btnLoadingText : btnText}
        </button>
        {post && (
          <button
            className={`btn ${styles.deleteBtn}`}
            onClick={(e) => {
              confirm("Are you sure you want to delete this post?");
              handleDelete(e);
            }}
          >
            {loading ? "Deleting" : "Delete (permanent)"}
          </button>
        )}
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.flexCol}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            className={styles.titleInput}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.flexRow}>
          <label htmlFor="slug">Slug:</label>
          <input
            id="slug"
            className={styles.slugInput}
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
            className={styles.contentInput}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
            {content}
          </textarea>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
