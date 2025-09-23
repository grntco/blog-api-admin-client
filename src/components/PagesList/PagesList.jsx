import styles from "./PagesList.module.css";
import { Link } from "react-router";

const PagesList = ({ pageData }) => {
  const currentPage = pageData.currentPage;
  const totalPages = pageData.totalPages;

  const nums = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    totalPages > 1 && (
      <ul className={styles.pagesList}>
        {nums.map((num, index) => {
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
    )
  );
};

export default PagesList;
