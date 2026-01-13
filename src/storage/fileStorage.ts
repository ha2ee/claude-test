import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Task, createTask, completeTask, TaskCreateInput } from '../models/task';

interface StorageData {
  tasks: Task[];
  nextId: number;
}

export class TaskStorage {
  private filePath: string;

  constructor() {
    this.filePath = path.join(os.homedir(), '.tasks.json');
  }

  private read(): StorageData {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(data);
      }
    } catch {
      // If file is corrupted, start fresh
    }
    return { tasks: [], nextId: 1 };
  }

  private write(data: StorageData): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  getAllTasks(): Task[] {
    return this.read().tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.read().tasks.find(t => t.id === id);
  }

  addTask(input: TaskCreateInput): Task {
    const data = this.read();
    const task = createTask(input, data.nextId);
    data.tasks.push(task);
    data.nextId++;
    this.write(data);
    return task;
  }

  completeTaskById(id: number): Task | null {
    const data = this.read();
    const index = data.tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    data.tasks[index] = completeTask(data.tasks[index]);
    this.write(data);
    return data.tasks[index];
  }

  deleteTask(id: number): boolean {
    const data = this.read();
    const index = data.tasks.findIndex(t => t.id === id);
    if (index === -1) return false;

    data.tasks.splice(index, 1);
    this.write(data);
    return true;
  }

  clearCompleted(): number {
    const data = this.read();
    const before = data.tasks.length;
    data.tasks = data.tasks.filter(t => !t.completed);
    this.write(data);
    return before - data.tasks.length;
  }
}

export const storage = new TaskStorage();
