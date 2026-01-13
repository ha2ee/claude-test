import { storage } from '../storage/fileStorage';

export function completeTask(id: string): void {
  const taskId = parseInt(id, 10);

  if (isNaN(taskId)) {
    console.error('Error: Invalid task ID');
    process.exit(1);
  }

  const task = storage.completeTaskById(taskId);

  if (!task) {
    console.error(`Error: Task #${taskId} not found`);
    process.exit(1);
  }

  console.log(`Completed task #${task.id}: "${task.title}"`);
}
