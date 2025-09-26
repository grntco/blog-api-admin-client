import styles from "./SearchForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import getApiUrl from "../../../utils/getApiUrl";

const SearchForm = ({ path, prevSearch, urlBase, setUrl }) => {
  const [search, setSearch] = useState(prevSearch || "");
  const navigate = useNavigate();
  const API_BASE_URL = getApiUrl();

  const handleSearch = async (e) => {
    e.preventDefault();
    const currentUrl = new URL(urlBase, `${API_BASE_URL}/${path}`);

    if (!search.trim()) {
      currentUrl.searchParams.delete("search");
    } else {
      currentUrl.searchParams.set("search", search);
    }
    currentUrl.searchParams.delete("page");

    navigate(`/${path}`);
    setUrl(currentUrl.toString());
  };

  return (
    <form className={styles.form}>
      <input
        id="search"
        className={styles.searchInput}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
