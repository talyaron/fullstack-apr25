import React from 'react';
import Navbar from '../components/Navbar';
import TaskCreate from '../components/TaskCreate';

const TaskCreatePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="py-8">
        <TaskCreate />
      </div>
    </div>
  );
};

export default TaskCreatePage;
