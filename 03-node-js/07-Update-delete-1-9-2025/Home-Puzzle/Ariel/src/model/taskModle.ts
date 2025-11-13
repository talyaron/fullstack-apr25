export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
}

// Level 2: Enhanced Task interface
export interface EnhancedTask extends Task {
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
}