import styles from "./SearchForm.module.css";
import { useState } from "react";

const SearchForm = ({ prevSearch, urlBase, setUrl }) => {
  const [search, setSearch] = useState(prevSearch || "");

  const handleSearch = async (e) => {
    e.preventDefault();

    const newUrl = !search.trim()
      ? urlBase
      : urlBase +
        (!urlBase.includes("?") ? "?" : "") +
        `search=${search.trim()}`;

    setUrl(newUrl);
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
