import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import useMutation from "../hooks/api/useMutation";
import useAuth from "../hooks/auth/useAuth";
import { useNavigate } from "react-router";
import getApiUrl from "../utils/getApiUrl";

const Login = () => {
  const { mutate, loading, error } = useMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = getApiUrl(0);

  useEffect(() => {
    if (error && error.formData) {
      setFormData((prevData) => ({
        ...prevData,
        ...error.formData,
        password: "",
      }));
    }
  }, [error]);

  const inputs = [
    {
      label: "Email",
      id: "email",
      type: "email",
    },
    {
      label: "Password",
      id: "password",
      type: "password",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await mutate(
        `${API_BASE_URL}/auth/admin/login`,
        formData,
        {
          method: "POST",
        }
      );

      setFormData({
        email: error?.formData.email ?? "",
        password: "",
      });

      // switched from !error
      if (result && result.success && result.token) {
        login(result.token, result.user);
        navigate("/", {
          replace: true,
          state: { message: result.message, type: "success" },
        });
      }
    } catch (err) {
      console.error("A login error occurred:", err);

      setFormData((prevData) => ({
        ...prevData,
        password: "",
      }));
    }
  };

  return (
    <section>
      <AuthForm
        inputs={inputs}
        title={"Login"}
        type={"login"}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default Login;
