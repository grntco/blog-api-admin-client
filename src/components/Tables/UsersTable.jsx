import styles from "./Table.module.css";
import { Link } from "react-router";
import formatDate from "../../utils/formatDate";

const UsersTable = ({ users }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Last modified</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.admin ? "Admin" : "Member"}</td>
                <td>{formatDate(user.updatedAt)}</td>
                <td>
                  <Link className={"grey"} to={`/users/${user.id}/edit`}>
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
