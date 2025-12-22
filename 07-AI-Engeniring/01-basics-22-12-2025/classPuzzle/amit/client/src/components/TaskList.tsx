import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';
import { Priority } from '../types';
import TaskCard from './TaskCard';
import TaskSkeleton from './TaskSkeleton';

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, isLoading, fetchTasks } = useTaskStore();
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<Priority | ''>('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = () => {
    fetchTasks(search, priorityFilter);
  };

  const handleReset = () => {
    setSearch('');
    setPriorityFilter('');
    fetchTasks();
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="bg-gradient-to-r from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/30 rounded-2xl shadow-2xl p-6 border-2 border-purple-200 dark:border-purple-700 scale-in">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          🔍 Search & Filter
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="🔎 Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-6 py-3 border-2 border-purple-300 dark:border-purple-600 rounded-xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg transition-all duration-300"
          />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | '')}
            className="px-6 py-3 border-2 border-purple-300 dark:border-purple-600 rounded-xl focus:ring-4 focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-lg font-medium transition-all duration-300"
          >
            <option value="">All Priorities</option>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>

          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            🔍 Search
          </button>

          <button
            onClick={handleReset}
            className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => navigate('/tasks/new')}
        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-green-500/50 transform hover:scale-105 btn-pulse"
      >
        ✨ + Add New Task
      </button>

      {/* Task List */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <TaskSkeleton key={i} />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl shadow-2xl border-2 border-purple-200 dark:border-purple-700 scale-in">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            No tasks found. Create your first task!
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onClick={() => navigate(`/tasks/${task._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
