import Alert from "../Alert/Alert";
import styles from "./AuthForm.module.css";
import { Link } from "react-router";

const AuthForm = ({
  inputs,
  title,
  type,
  formData,
  setFormData,
  loading,
  error,
  handleSubmit,
}) => {
  const USER_BLOG_URL = import.meta.env.VITE_USER_BLOG_URL;
  const btnText = type.toLowerCase() === "register" ? "Register" : "Login";
  const btnLoadingText =
    type.toLowerCase() === "register" ? "Creating Account..." : "Logging in";

  const validationErrors = error?.errors ?? [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Alert
        alertMessage={error ? error.message : ""}
        alertType={error ? "error" : ""}
      />
      {validationErrors.length > 0 &&
        validationErrors.map((error, index) => {
          return (
            <Alert key={index} alertMessage={error.msg} alertType={"error"} />
          );
        })}
      <div className={styles.formContainer}>
        <h1>{title}</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ul className={styles.inputsList}>
            {inputs.map((input, index) => {
              return (
                <li key={index} className={styles.inputItem}>
                  <label htmlFor={input.id}>{input.label}</label>
                  <input
                    id={input.id}
                    name={input.id}
                    type={input.type}
                    value={formData[input.id] || ""}
                    onChange={handleInputChange}
                    required
                  />
                </li>
              );
            })}
          </ul>
          <button type="submit" className={`btn ${styles.btn}`}>
            {loading ? btnLoadingText : btnText}
          </button>
          <p className="info-text">
            {type === "register" ? (
              <span>
                Already a member? <Link to={"/login"}>Login</Link>.
              </span>
            ) : (
              <span>
                Not a member?{" "}
                <Link to={`${USER_BLOG_URL}/register`}>Create an account</Link>.
              </span>
            )}
          </p>
        </form>
      </div>
    </>
  );
};

export default AuthForm;
