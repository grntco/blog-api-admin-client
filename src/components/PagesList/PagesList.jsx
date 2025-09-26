import styles from "./PagesList.module.css";
import { useNavigate } from "react-router";
import getApiUrl from "../../utils/getApiUrl";

const PagesList = ({ path, pageData, setUrl, urlBase }) => {
  const currentPage = pageData.currentPage;
  const totalPages = pageData.totalPages;
  const nums = Array.from({ length: totalPages }, (_, i) => i + 1);

  const navigate = useNavigate();
  const API_BASE_URL = getApiUrl();

  const handleOnClick = (e, pageNum) => {
    e.preventDefault();
    const currentUrl = new URL(urlBase, API_BASE_URL);

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
