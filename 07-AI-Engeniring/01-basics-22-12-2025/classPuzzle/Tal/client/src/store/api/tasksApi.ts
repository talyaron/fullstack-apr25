import { baseApi } from './baseApi';
import type { TaskCreate, TaskUpdate, TaskResponse, ApiResponse } from '@space-task/shared';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<ApiResponse<TaskResponse[]>, void>({
      query: () => '/tasks',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Task' as const, id: _id })),
              { type: 'TaskList' },
            ]
          : [{ type: 'TaskList' }],
    }),

    getTask: builder.query<ApiResponse<TaskResponse>, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Task', id }],
    }),

    createTask: builder.mutation<ApiResponse<TaskResponse>, TaskCreate>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: [{ type: 'TaskList' }],
    }),

    updateTask: builder.mutation<ApiResponse<TaskResponse>, { id: string; data: TaskUpdate }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Task', id },
        { type: 'TaskList' },
      ],
    }),

    deleteTask: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Task', id },
        { type: 'TaskList' },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
