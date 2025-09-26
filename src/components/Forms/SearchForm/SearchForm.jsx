import styles from "./SearchForm.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchForm = ({ path, prevSearch, urlBase, setUrl }) => {
  const [search, setSearch] = useState(prevSearch || "");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const currentUrl = new URL(urlBase, `http://localhost:3000/${path}`);

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
