import Alert from "../components/Alert/Alert.jsx";
import PagesList from "../components/PagesList/PagesList.jsx";
import PostsTable from "../components/PostsTable/PostsTable.jsx";
import SearchForm from "../components/SearchForm/SearchForm.jsx";
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

  console.log(data);

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
        <SearchForm prevSearch={prevSearch} urlBase={urlBase} setUrl={setUrl} />
        <PostsTable posts={posts} />
        <PagesList pageData={pageData} />
      </section>
    </div>
  );
};

export default Posts;
