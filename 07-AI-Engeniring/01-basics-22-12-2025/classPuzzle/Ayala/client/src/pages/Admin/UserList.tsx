import { useEffect, useState } from 'react';
import api from '../../services/api';
import styles from './UserList.module.scss';

interface UserData {
  _id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
}

const UserList = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <div className={styles.userList}>
      <h2>משתמשים רשומים ({users.length})</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>שם מלא</th>
            <th>אימייל</th>
            <th>תפקיד</th>
            <th>תאריך הרשמה</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <span className={`${styles.role} ${styles[user.role]}`}>
                  {user.role === 'admin' ? 'מנהל' : 'משתמש'}
                </span>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString('he-IL')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
