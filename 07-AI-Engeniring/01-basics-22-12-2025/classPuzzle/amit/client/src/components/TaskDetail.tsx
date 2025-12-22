import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTaskStore } from '../store/taskStore';
import { UpdateTaskInput, Priority } from '../types';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);

  const task = tasks.find((t) => t._id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskInput>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      priority: task?.priority || 'medium',
      due_date: task?.due_date
        ? new Date(task.due_date).toISOString().split('T')[0]
        : '',
      status: task?.status || false,
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.due_date
          ? new Date(task.due_date).toISOString().split('T')[0]
          : '',
        status: task.status,
      });
    }
  }, [task, reset]);

  const onSubmit = async (data: UpdateTaskInput) => {
    if (!id) return;
    try {
      await updateTask(id, {
        ...data,
        due_date: data.due_date || null,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
      navigate('/');
    }
  };

  if (!task) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">Task not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Go back to tasks
          </button>
        </div>
      </div>
    );
  }

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to tasks
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Task Details
          </h1>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            {isEditing ? (
              <>
                <input
                  {...register('title', {
                    required: 'Title is required',
                    minLength: {
                      value: 1,
                      message: 'Title must not be empty',
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </>
            ) : (
              <p className="text-lg text-gray-900 dark:text-white">
                {task.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            {isEditing ? (
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                {task.description || 'No description'}
              </p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            {isEditing ? (
              <select
                {...register('priority')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            ) : (
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Due Date
            </label>
            {isEditing ? (
              <input
                type="date"
                {...register('due_date')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'No due date'}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('status')}
                disabled={!isEditing}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mark as completed
              </span>
            </label>
          </div>

          {isEditing && (
            <button
              type="submit"
              className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
            >
              Save Changes
            </button>
          )}
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date(task.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
