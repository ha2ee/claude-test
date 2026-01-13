export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export type TaskCreateInput = Pick<Task, 'title'>;

export function createTask(input: TaskCreateInput, id: number): Task {
  return {
    id,
    title: input.title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function completeTask(task: Task): Task {
  return {
    ...task,
    completed: true,
    completedAt: new Date().toISOString(),
  };
}
