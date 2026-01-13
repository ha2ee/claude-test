import { storage } from '../storage/fileStorage';

export function clearCompleted(): void {
  const count = storage.clearCompleted();

  if (count === 0) {
    console.log('No completed tasks to clear');
  } else {
    console.log(`Cleared ${count} completed task${count > 1 ? 's' : ''}`);
  }
}
