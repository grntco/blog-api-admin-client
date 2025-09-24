import styles from "./PagesList.module.css";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const PagesList = ({ path, pageData, setUrl, urlBase }) => {
  const currentPage = pageData.currentPage;
  const totalPages = pageData.totalPages;
  const nums = Array.from({ length: totalPages }, (_, i) => i + 1);

  const navigate = useNavigate();

  const handleOnClick = (e, pageNum) => {
    e.preventDefault();
    const currentUrl = new URL(urlBase, "http://localhost:3000");

    if (pageNum === 1) {
      currentUrl.searchParams.delete("page");
      navigate(`/${path}`);
    } else {
      currentUrl.searchParams.set("page", pageNum);
      navigate(`/${path}/${pageNum}`);
    }

    setUrl(currentUrl.toString());
  };

  return (
    totalPages > 1 && (
      <ul className={styles.pagesList}>
        {nums.map((num, index) => {
          return (
            <li key={index}>
              <a
                // to={`/${path}${num > 1 ? `/${num}` : ""}`}
                className={num === currentPage ? styles.active : ""}
                onClick={(e) => handleOnClick(e, num)}
              >
                {num}
              </a>
            </li>
          );
        })}
      </ul>
    )
  );
};

export default PagesList;
