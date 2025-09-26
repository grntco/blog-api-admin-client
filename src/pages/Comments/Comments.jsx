import Alert from "../../components/Alert/Alert.jsx";
import SearchForm from "../../components/Forms/SearchForm/SearchForm.jsx";
import CommentsTable from "../../components/Tables/CommentsTable.jsx";
import PagesList from "../../components/PagesList/PagesList.jsx";
import NoResults from "../../components/Tables/NoResults.jsx";
import useFetch from "../../hooks/api/useFetch.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Comments = () => {
  const { page } = useParams();
  const urlBase = `http://localhost:3000/comments${
    page && page > 1 ? `?page=${page}` : ""
  }`;
  const [url, setUrl] = useState(urlBase);
  const { data, error, loading } = useFetch(url);
  const validationErrors = error?.errors || [];

  useEffect(() => {
    if (!url.includes("search=")) {
      setUrl(urlBase);
    }
  }, [page, urlBase]);

  if (loading) return "loading...";

  const comments = data.comments ?? [];
  const prevSearch = data.formData?.search;
  const pageData = {
    currentPage: data.meta?.currentPage,
    totalPages: data.meta?.totalPages,
  };

  return (
    <div>
      <section>
        <Alert
          alertMessage={error?.error || error?.message || ""}
          alertType={error ? "error" : ""}
        />
        {validationErrors.length > 0 &&
          validationErrors.map((error, index) => {
            return (
              <Alert key={index} alertMessage={error.msg} alertType={"error"} />
            );
          })}
        <h1>Comments</h1>
        <SearchForm
          path={"comments"}
          prevSearch={prevSearch}
          urlBase={urlBase}
          setUrl={setUrl}
        />

        {comments.length > 0 ? (
          <CommentsTable comments={comments} />
        ) : (
          <NoResults
            prevSearch={prevSearch}
            urlBase={urlBase}
            setUrl={setUrl}
          />
        )}
        <PagesList
          path={"comments"}
          pageData={pageData}
          urlBase={urlBase}
          setUrl={setUrl}
        />
      </section>
    </div>
  );
};

export default Comments;
