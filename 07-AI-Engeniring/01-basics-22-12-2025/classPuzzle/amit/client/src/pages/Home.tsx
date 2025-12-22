import React from 'react';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
