export type Priority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  username: string;
}

export interface Task {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  status: boolean;
  priority: Priority;
  due_date: string | null;
  deleted_at: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  due_date?: string;
  status?: boolean;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: Priority;
  due_date?: string | null;
  status?: boolean;
}
