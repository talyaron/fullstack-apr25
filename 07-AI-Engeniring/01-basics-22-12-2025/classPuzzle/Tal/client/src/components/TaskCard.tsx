import { TaskResponse } from '@space-task/shared';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../store/api/tasksApi';

interface TaskCardProps {
  task: TaskResponse;
  onEdit: (task: TaskResponse) => void;
}

const priorityBadgeClasses = {
  low: 'badge-priority-low',
  medium: 'badge-priority-medium',
  high: 'badge-priority-high',
};

const statusBadgeClasses = {
  pending: 'badge-status-pending',
  'in-progress': 'badge-status-in-progress',
  completed: 'badge-status-completed',
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
    <Card hover>
      <div className="card-header">
        <h3 className="card-title">{task.title}</h3>
        <div className="flex gap-2">
          <span className={priorityBadgeClasses[task.priority]}>
            {task.priority}
          </span>
          <span className={statusBadgeClasses[task.status]}>
            {task.status}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="text-muted text-sm line-clamp-2">{task.description}</p>
      )}

      {task.dueDate && (
        <p className="text-muted text-xs" style={{ marginTop: '1rem' }}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="card-footer">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as typeof task.status)}
          className="select input-sm"
          style={{ width: 'auto' }}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => onEdit(task)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
