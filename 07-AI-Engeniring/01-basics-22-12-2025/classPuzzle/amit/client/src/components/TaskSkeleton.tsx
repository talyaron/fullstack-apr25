import React from 'react';

const TaskSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <div className="skeleton h-6 w-3/4 mb-2"></div>
        <div className="skeleton h-8 w-16 rounded"></div>
      </div>
      <div className="skeleton h-4 w-full mb-2"></div>
      <div className="skeleton h-4 w-2/3 mb-3"></div>
      <div className="flex justify-between items-center mt-4">
        <div className="skeleton h-5 w-20 rounded-full"></div>
        <div className="skeleton h-4 w-24"></div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
