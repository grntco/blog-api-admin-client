import Alert from "../components/Alert/Alert.jsx";
import PagesList from "../components/PagesList/PagesList.jsx";
import PostsTable from "../components/Tables/PostsTable.jsx";
import SearchForm from "../components/SearchForm/SearchForm.jsx";
import PublishedForm from "../components/PublishedForm/PublishedForm.jsx";
import useFetch from "../hooks/api/useFetch.jsx";
import { Link, useParams } from "react-router";
import { useState } from "react";

const Posts = () => {
  const { page } = useParams();
  const urlBase = `http://localhost:3000/posts${page ? `?page=${page}` : ""}`;
  const [url, setUrl] = useState(urlBase);
  const { data, error, loading } = useFetch(url);

  if (loading) return "loading...";
  if (error) return "error";

  const posts = data.posts ?? [];
  const prevSearch = data.formData?.search;
  const pageData = {
    currentPage: data.meta?.currentPage,
    totalPages: data.meta?.totalPages,
  };

  return (
    <div>
      <section>
        <Alert />
        <h1>Posts</h1>
        <PublishedForm
          path={"posts"}
          urlBase={urlBase}
          currentUrl={url}
          setUrl={setUrl}
        />
        <SearchForm
          path={"posts"}
          prevSearch={prevSearch}
          urlBase={urlBase}
          setUrl={setUrl}
        />
        <PostsTable posts={posts} />
        <PagesList path={"posts"} pageData={pageData} />
      </section>
    </div>
  );
};

export default Posts;
