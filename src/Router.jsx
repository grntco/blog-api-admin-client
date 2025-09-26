import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import About from "./pages/About";
import Posts from "./pages/Posts/Posts";
import EditPost from "./pages/Posts/EditPost";
import AddPost from "./pages/Posts/AddPost";
import Users from "./pages/Users/Users";
import EditUser from "./pages/Users/EditUser";
import Comments from "./pages/Comments/Comments";
import EditComment from "./pages/Comments/EditComment";
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
        {
          path: "users/:userId/edit",
          element: <EditUser />,
        },
        // Comments
        {
          path: "comments/:page?",
          element: <Comments />,
        },
        {
          path: "comments/:commentId/edit",
          element: <EditComment />,
        },
        // Auth
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
