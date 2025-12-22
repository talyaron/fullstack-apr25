import { useState } from 'react';
import { useGetTasksQuery } from '../store/api/tasksApi';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { Button } from '../components/ui/Button';
import { Navbar } from '../components/Navbar';
import { TaskResponse } from '@space-task/shared';

export const TaskListPage = () => {
  const { data, isLoading, isError } = useGetTasksQuery();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskResponse | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const tasks = data?.data || [];
  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

  const handleEdit = (task: TaskResponse) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Your Tasks</h1>
            <p className="text-white/60 mt-1">Manage your cosmic missions</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            + New Task
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${filter === status
                  ? 'bg-gradient-to-r from-cosmic-purple to-stellar-cyan'
                  : 'bg-white/10 hover:bg-white/20'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-stellar-cyan border-t-transparent rounded-full" />
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-400">Failed to load tasks. Please try again.</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🌟</span>
            <p className="text-white/60 text-lg">No tasks found</p>
            <p className="text-white/40 text-sm mt-2">
              {filter === 'all' ? 'Create your first task to get started!' : 'No tasks match this filter'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={handleEdit} />
            ))}
          </div>
        )}

        {showForm && <TaskForm task={editingTask} onClose={handleCloseForm} />}
      </main>
    </div>
  );
};
