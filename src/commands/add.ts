import { storage } from '../storage/fileStorage';

export function addTask(title: string): void {
  if (!title.trim()) {
    console.error('Error: Task title cannot be empty');
    process.exit(1);
  }

  const task = storage.addTask({ title: title.trim() });
  console.log(`Added task #${task.id}: "${task.title}"`);
}
