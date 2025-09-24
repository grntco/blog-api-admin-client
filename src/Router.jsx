import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";
import Posts from "./pages/Posts";
import EditPost from "./pages/EditPost";
import AddPost from "./pages/AddPost";
import Users from "./pages/Users";
import Comments from "./pages/Comments";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./hooks/auth/AuthContext";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        // Posts
        {
          path: "posts/:page?",
          element: <Posts />,
        },
        {
          path: "posts/add",
          element: <AddPost />,
        },
        {
          path: "posts/:postId/edit",
          element: <EditPost />,
        },
        // Users
        {
          path: "users/:page?",
          element: <Users />,
        },
        // Comments
        {
          path: "comments/:page?",
          element: <Comments />,
        },
        // {
        //   path: "users/add",
        //   element: <AddPost />,
        // },
        // {
        //   path: "users/:userId/edit",
        //   element: <EditPost />,
        // },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default Router;
