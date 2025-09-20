import Router from "./Router.jsx";
import Layout from "./layout/Layout.jsx";
import { AuthProvider } from "./hooks/auth/AuthContext.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;
