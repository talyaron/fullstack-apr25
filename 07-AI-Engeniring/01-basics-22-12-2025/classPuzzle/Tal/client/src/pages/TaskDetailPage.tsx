import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTaskQuery, useDeleteTaskMutation } from '../store/api/tasksApi';
import { TaskForm } from '../components/TaskForm';
import { Navbar } from '../components/Navbar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const priorityColors = {
  low: 'bg-green-500/20 text-green-300 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  high: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const statusColors = {
  pending: 'bg-gray-500/20 text-gray-300',
  'in-progress': 'bg-blue-500/20 text-blue-300',
  completed: 'bg-green-500/20 text-green-300',
};

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTaskQuery(id!);
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [showEdit, setShowEdit] = useState(false);

  const task = data?.data;

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id!);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen cosmic-bg">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tasks
        </button>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-stellar-cyan border-t-transparent rounded-full" />
          </div>
        ) : isError || !task ? (
          <Card className="text-center py-12">
            <p className="text-red-400">Task not found or failed to load.</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Return to Tasks
            </Button>
          </Card>
        ) : (
          <Card>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gradient mb-2">{task.title}</h1>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 text-sm rounded-full border ${priorityColors[task.priority]}`}>
                    {task.priority} priority
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setShowEdit(true)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
                  Delete
                </Button>
              </div>
            </div>

            {task.description && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white/60 mb-2">Description</h3>
                <p className="text-white/80 whitespace-pre-wrap">{task.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              {task.dueDate && (
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-1">Due Date</h3>
                  <p className="text-white">{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-1">Created</h3>
                <p className="text-white">{new Date(task.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/60 mb-1">Last Updated</h3>
                <p className="text-white">{new Date(task.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>
        )}

        {showEdit && task && <TaskForm task={task} onClose={() => setShowEdit(false)} />}
      </main>
    </div>
  );
};
