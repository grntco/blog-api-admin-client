import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import useMutation from "../hooks/api/useMutation";
import { useNavigate } from "react-router";

const Register = () => {
  const { mutate, loading, error } = useMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
      label: "First name",
      id: "firstName",
      type: "text",
    },
    {
      label: "Last name",
      id: "lastName",
      type: "text",
    },
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
        "http://localhost:3000/auth/register",
        formData,
        {
          method: "POST",
        }
      );

      setFormData({
        firstName: error?.formData.firstName ?? "",
        lastName: error?.formData.lastName ?? "",
        email: error?.formData.email ?? "",
        password: "",
      });

      if (result && result.success) {
        navigate("/login", {
          replace: true,
          state: { message: result.message, type: "success" },
        });
      }
    } catch (err) {
      console.error("A registration error occurred:", err);
    }
  };

  return (
    <section>
      <AuthForm
        inputs={inputs}
        title={"Create Account"}
        type={"register"}
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default Register;
