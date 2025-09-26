import styles from "./UserForm.module.css";
import useMutation from "../../../hooks/api/useMutation";
import { useState } from "react";
import { useNavigate } from "react-router";
import getApiUrl from "../../../utils/getApiUrl";

// Only used in EditUser, since admins can't add new users
const UserForm = ({ user = null }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [admin, setAdmin] = useState(user?.admin || false);

  const { mutate, error, loading } = useMutation();
  const navigate = useNavigate();
  const API_BASE_URL = getApiUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;

    try {
      const url = `${API_BASE_URL}/users/${user?.id}`;

      const data = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        admin: admin ? "true" : "false",
      };

      const result = await mutate(url, data, {
        method: "PATCH",
      });

      if (!error && result && result.success) {
        navigate("/users", {
          replace: true,
          state: { message: result.message, type: "success" },
        });
      }
    } catch (err) {
      console.error(`Error editing user:`, err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const result = await mutate(
        `${API_BASE_URL}/users/${user?.id}`,
        {},
        { method: "DELETE" }
      );

      if (!error && result && result.success) {
        navigate("/users", {
          replace: true,
          state: { message: result.message, type: "success" },
        });
      }
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  return (
    <>
      {error && (
        <Alert
          alertMessage={error.error || error.message || "An error occurred."}
          alertType="error"
        />
      )}
      <form>
        <div className={styles.inputsContainer}>
          <div className={styles.flexCol}>
            <label htmlFor="firstName">First name:</label>
            <input
              id="firstName"
              className={styles.nameInput}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.flexCol}>
            <label htmlFor="lastName">Last name:</label>
            <input
              id="lastName"
              className={styles.nameInput}
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles.flexCol}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              className={styles.emailInput}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.flexRow}>
            <label htmlFor="admin">Admin:</label>
            <input
              id="admin"
              type="checkbox"
              checked={admin}
              onChange={(e) => setAdmin((prev) => (e.checked = !prev))}
            />
          </div>
        </div>
        <div className={styles.btnsContainer}>
          <button className="btn" type="submit" onClick={handleSubmit}>
            {loading ? "Updating" : "Update"}
          </button>
          <button
            className={`btn ${styles.deleteBtn}`}
            onClick={(e) => {
              confirm("Are you sure you want to delete this user?");
              handleDelete(e);
            }}
          >
            {loading ? "Deleting" : "Delete (permanent)"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
