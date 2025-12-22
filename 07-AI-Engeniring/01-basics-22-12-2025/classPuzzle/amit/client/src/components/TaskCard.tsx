import React from 'react';
import { Task } from '../types';
import { useTaskStore } from '../store/taskStore';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const { deleteTask } = useTaskStore();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task._id);
    }
  };

  const priorityColors = {
    low: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/50',
    medium: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/50',
    high: 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/50',
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer p-6 border-2 border-purple-200 dark:border-purple-700 card-hover scale-in"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400 flex-1">
          {task.title}
        </h3>
        <button
          onClick={handleDelete}
          className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-110"
          aria-label="Delete task"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {task.description && (
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-4">
        <span
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
            priorityColors[task.priority]
          } transform hover:scale-110 transition-transform duration-300`}
        >
          {task.priority}
        </span>
        <span className="text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center">
          📅 {formatDate(task.due_date)}
        </span>
      </div>

      {task.status && (
        <div className="mt-3 flex items-center bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-semibold px-3 py-2 rounded-lg shadow-lg">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          ✓ Completed
        </div>
      )}
    </div>
  );
};

export default TaskCard;
