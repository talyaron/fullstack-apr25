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
      <h1>Admin Dashboard</h1>

      <div className={styles.tabs}>
        <button
          className={`btn-tab ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          Manage Recipes
        </button>
        <button
          className={`btn-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Registered Users
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'recipes' ? <RecipeManagement /> : <UserList />}
      </div>
    </div>
  );
};

export default Admin;
