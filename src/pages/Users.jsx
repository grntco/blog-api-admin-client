import useFetch from "../hooks/api/useFetch.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Alert from "../components/Alert/Alert.jsx";
import SearchForm from "../components/SearchForm/SearchForm.jsx";
import UsersTable from "../components/Tables/UsersTable.jsx";
import PagesList from "../components/PagesList/PagesList.jsx";

const Users = () => {
  const { page } = useParams();
  const urlBase = `http://localhost:3000/users${
    page && page > 1 ? `?page=${page}` : ""
  }`;
  const [url, setUrl] = useState(urlBase);
  const { data, error, loading } = useFetch(url);

  useEffect(() => {
    if (!url.includes("search=")) {
      setUrl(urlBase);
    }
  }, [page, urlBase]);

  if (loading) return "loading...";
  if (error) return "error";

  const users = data.users ?? [];
  const prevSearch = data.formData?.search;
  console.log(prevSearch);
  const pageData = {
    currentPage: data.meta?.currentPage,
    totalPages: data.meta?.totalPages,
  };

  return (
    <div>
      <section>
        <Alert />
        <h1>Users</h1>
        <SearchForm
          path={"users"}
          prevSearch={prevSearch}
          urlBase={urlBase}
          setUrl={setUrl}
        />
        {users.length > 0 ? (
          <UsersTable users={users} />
        ) : (
          <p>
            No results found{prevSearch ? " for '" + prevSearch + "'" : ""}.{" "}
            <a
              onClick={(e) => {
                e.preventDefault();
                setUrl(urlBase);
              }}
            >
              View all results
            </a>
            .
          </p>
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

export default Users;
