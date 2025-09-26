import getApiUrl from "../../../utils/getApiUrl";
import styles from "./PublishedForm.module.css";
import { useNavigate } from "react-router";

const PublishedForm = ({ path, urlBase, currentUrl, setUrl }) => {
  const navigate = useNavigate();
  const API_BASE_URL = getApiUrl();
  const parsedCurrentUrl = new URL(currentUrl, API_BASE_URL);
  const checked = parsedCurrentUrl.searchParams.get("published") === "true";

  const handleOnChange = () => {
    const newUrl = new URL(urlBase, `${API_BASE_URL}/${path}`);
    if (checked) {
      newUrl.searchParams.delete("published");
    } else {
      newUrl.searchParams.set("published", "true");
    }
    newUrl.searchParams.delete("page");

    navigate(`/${path}`);
    setUrl(newUrl.toString());
  };

  return (
    <form className={styles.form}>
      <label htmlFor="published">Show published only: </label>
      <input
        id="published"
        type="checkbox"
        onChange={handleOnChange}
        checked={checked}
      />
    </form>
  );
};

export default PublishedForm;
