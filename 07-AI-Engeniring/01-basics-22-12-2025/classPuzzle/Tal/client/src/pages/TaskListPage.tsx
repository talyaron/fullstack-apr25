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
    <div className="page cosmic-bg">
      <Navbar />

      <main className="container page-content">
        <div className="flex-between" style={{ marginBottom: '2rem' }}>
          <div>
            <h1 className="text-3xl font-bold text-gradient">Your Tasks</h1>
            <p className="text-muted" style={{ marginTop: '0.25rem' }}>Manage your cosmic missions</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            + New Task
          </Button>
        </div>

        <div className="flex gap-2" style={{ marginBottom: '1.5rem' }}>
          {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={filter === status ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="loading-overlay">
            <div className="spinner" />
          </div>
        ) : isError ? (
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <p className="alert-error">Failed to load tasks. Please try again.</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center" style={{ padding: '3rem 0' }}>
            <span className="text-4xl" style={{ display: 'block', marginBottom: '1rem' }}>🌟</span>
            <p className="text-muted text-lg">No tasks found</p>
            <p className="text-muted text-sm" style={{ marginTop: '0.5rem' }}>
              {filter === 'all' ? 'Create your first task to get started!' : 'No tasks match this filter'}
            </p>
          </div>
        ) : (
          <div className="grid grid-responsive gap-4">
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
