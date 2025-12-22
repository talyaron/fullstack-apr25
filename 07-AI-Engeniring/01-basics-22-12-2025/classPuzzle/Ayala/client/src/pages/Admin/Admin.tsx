import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import UserList from './UserList';
import RecipeManagement from './RecipeManagement';
import styles from './Admin.module.scss';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState<'users' | 'recipes'>('recipes');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className={styles.adminPage}>
      <h1>לוח ניהול</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'recipes' ? styles.active : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          ניהול מתכונים
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
          onClick={() => setActiveTab('users')}
        >
          משתמשים רשומים
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'recipes' ? <RecipeManagement /> : <UserList />}
      </div>
    </div>
  );
};

export default Admin;
