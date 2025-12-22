import { useState, FormEvent, useEffect } from 'react';
import { TaskCreate, TaskResponse } from '@space-task/shared';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../store/api/tasksApi';

interface TaskFormProps {
  task?: TaskResponse | null;
  onClose: () => void;
}

export const TaskForm = ({ task, onClose }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
  const [error, setError] = useState('');

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const isEditing = !!task;
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const taskData: TaskCreate = {
      title,
      description,
      priority,
      status,
      dueDate: dueDate || undefined,
    };

    try {
      if (isEditing) {
        await updateTask({ id: task._id, data: taskData }).unwrap();
      } else {
        await createTask(taskData).unwrap();
      }
      onClose();
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      setError(error.data?.message || 'Operation failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gradient">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg
                focus:outline-none focus:border-stellar-cyan focus:ring-1 focus:ring-stellar-cyan
                placeholder-white/40 transition-all duration-300 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as typeof priority)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg
                  focus:outline-none focus:border-stellar-cyan transition-all duration-300"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as typeof status)}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg
                  focus:outline-none focus:border-stellar-cyan transition-all duration-300"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} className="flex-1">
              {isEditing ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
