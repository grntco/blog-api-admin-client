const PublishedForm = ({ urlBase, currentUrl, setUrl }) => {
  const checked = currentUrl && currentUrl.includes("published=true");

  const handleOnChange = () => {
    let newUrl;
    if (!checked) {
      const separator = urlBase.includes("?") ? "&" : "?";
      newUrl = `${urlBase}${separator}published=true`;
    } else {
      newUrl = urlBase;
    }

    setUrl(newUrl);
  };

  return (
    <form>
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
