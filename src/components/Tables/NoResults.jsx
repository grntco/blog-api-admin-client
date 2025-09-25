const NoResults = ({ prevSearch, setUrl, urlBase }) => {
  return (
    <p>
      No results found{prevSearch ? " for '" + prevSearch + "'" : ""}.{" "}
      <a
        onClick={(e) => {
          e.preventDefault();
          setUrl(urlBase);
        }}
        className="grey"
      >
        View all results
      </a>
      .
    </p>
  );
};

export default NoResults;
