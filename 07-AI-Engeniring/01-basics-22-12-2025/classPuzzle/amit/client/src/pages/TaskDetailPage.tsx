import React from 'react';
import Navbar from '../components/Navbar';
import TaskDetail from '../components/TaskDetail';

const TaskDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="py-8">
        <TaskDetail />
      </div>
    </div>
  );
};

export default TaskDetailPage;
