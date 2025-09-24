import { useNavigate } from "react-router";

const PublishedForm = ({ path, urlBase, currentUrl, setUrl }) => {
  const navigate = useNavigate();
  const parsedCurrentUrl = new URL(currentUrl, "http://localhost:3000");
  const checked = parsedCurrentUrl.searchParams.get("published") === "true";

  const handleOnChange = () => {
    const newUrl = new URL(urlBase, `http://localhost:3000/${path}`);
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
