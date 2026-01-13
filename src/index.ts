#!/usr/bin/env node

import { Command } from 'commander';
import { addTask } from './commands/add';
import { listTasks } from './commands/list';
import { completeTask } from './commands/done';
import { deleteTask } from './commands/delete';
import { clearCompleted } from './commands/clear';

const program = new Command();

program
  .name('task')
  .description('A simple command-line task manager')
  .version('1.0.0');

program
  .command('add <title>')
  .description('Add a new task')
  .action(addTask);

program
  .command('list')
  .description('List all tasks')
  .option('-a, --all', 'Show completed tasks too')
  .action(listTasks);

program
  .command('done <id>')
  .description('Mark a task as completed')
  .action(completeTask);

program
  .command('delete <id>')
  .alias('rm')
  .description('Delete a task')
  .action(deleteTask);

program
  .command('clear')
  .description('Remove all completed tasks')
  .action(clearCompleted);

// Default to list if no command given
if (process.argv.length === 2) {
  listTasks({});
} else {
  program.parse();
}
