import Alert from "../../components/Alert/Alert.jsx";
import PagesList from "../../components/PagesList/PagesList.jsx";
import PostsTable from "../../components/Tables/PostsTable.jsx";
import SearchForm from "../../components/Forms/SearchForm/SearchForm.jsx";
import PublishedForm from "../../components/Forms/PublishedForm/PublishedForm.jsx";
import NoResults from "../../components/Tables/NoResults.jsx";
import useFetch from "../../hooks/api/useFetch.jsx";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

const Posts = () => {
  const { page } = useParams();
  const urlBase = `http://localhost:3000/posts${
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

  const posts = data.posts ?? [];
  const prevSearch = data.formData?.search;
  console.log(prevSearch);
  const pageData = {
    currentPage: data.meta?.currentPage,
    totalPages: data.meta?.totalPages,
  };

  return (
    <div>
      <section>
        {validationErrors.length > 0 &&
          validationErrors.map((error, index) => {
            return (
              <Alert key={index} alertMessage={error.msg} alertType={"error"} />
            );
          })}
        <h1>Posts</h1>
        <SearchForm
          path={"posts"}
          prevSearch={prevSearch}
          urlBase={urlBase}
          setUrl={setUrl}
        />
        <PublishedForm
          path={"posts"}
          urlBase={urlBase}
          currentUrl={url}
          setUrl={setUrl}
        />
        {posts.length > 0 ? (
          <PostsTable posts={posts} />
        ) : (
          <NoResults
            prevSearch={prevSearch}
            urlBase={urlBase}
            setUrl={setUrl}
          />
        )}
        <PagesList
          path={"users"}
          pageData={pageData}
          urlBase={urlBase}
          setUrl={setUrl}
        />
      </section>
    </div>
  );
};

export default Posts;
