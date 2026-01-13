import { storage } from '../storage/fileStorage';

export function deleteTask(id: string): void {
  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    console.error('Error: Invalid task ID');
    process.exit(1);
  }

  const task = storage.getTaskById(taskId);

  if (!task) {
    console.error(`Error: Task #${taskId} not found`);
    process.exit(1);
  }

  storage.deleteTask(taskId);
  console.log(`Deleted task #${taskId}: "${task.title}"`);
}
