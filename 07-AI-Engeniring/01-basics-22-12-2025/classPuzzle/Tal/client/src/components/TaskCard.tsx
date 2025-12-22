import { TaskResponse } from '@space-task/shared';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../store/api/tasksApi';

interface TaskCardProps {
  task: TaskResponse;
  onEdit: (task: TaskResponse) => void;
}

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

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleStatusChange = async (newStatus: typeof task.status) => {
    await updateTask({ id: task._id, data: { status: newStatus } });
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task._id);
    }
  };

  return (
    <Card hover className="group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-stellar-cyan transition-colors">
          {task.title}
        </h3>
        <div className="flex gap-2">
          <span className={`px-2 py-1 text-xs rounded-full border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-white/60 text-sm mb-4 line-clamp-2">{task.description}</p>
      )}

      {task.dueDate && (
        <p className="text-white/50 text-xs mb-4">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-white/10">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as typeof task.status)}
          className="bg-white/5 border border-white/20 rounded px-2 py-1 text-sm focus:outline-none focus:border-stellar-cyan"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => onEdit(task)} className="px-3 py-1 text-sm">
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
            className="px-3 py-1 text-sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
