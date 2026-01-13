import { storage } from '../storage/fileStorage';
import { Task } from '../models/task';

function formatTask(task: Task): string {
  const status = task.completed ? '[x]' : '[ ]';
  const id = `#${task.id}`.padEnd(4);
  return `${status} ${id} ${task.title}`;
}

export function listTasks(options: { all?: boolean }): void {
  const tasks = storage.getAllTasks();

  if (tasks.length === 0) {
    console.log('No tasks yet. Add one with: task add "Your task"');
    return;
  }

  const filtered = options.all ? tasks : tasks.filter(t => !t.completed);

  if (filtered.length === 0) {
    console.log('All tasks completed! Use --all to see them.');
    return;
  }

  const pending = filtered.filter(t => !t.completed);
  const completed = filtered.filter(t => t.completed);

  if (pending.length > 0) {
    console.log('Pending:');
    pending.forEach(t => console.log('  ' + formatTask(t)));
  }

  if (completed.length > 0 && options.all) {
    if (pending.length > 0) console.log('');
    console.log('Completed:');
    completed.forEach(t => console.log('  ' + formatTask(t)));
  }

  console.log('');
  console.log(`Total: ${pending.length} pending, ${tasks.filter(t => t.completed).length} completed`);
}
