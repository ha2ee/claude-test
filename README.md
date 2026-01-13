# Task CLI

A simple and elegant command-line task manager built with TypeScript.

## Features

- Add, list, complete, and delete tasks
- Tasks persist in a local JSON file (`~/.tasks.json`)
- Clean, minimal interface
- Zero external runtime dependencies

## Installation

```bash
npm install
npm run build
```

## Usage

```bash
# Add a task
node dist/index.js add "Buy groceries"

# List pending tasks
node dist/index.js list

# List all tasks (including completed)
node dist/index.js list --all

# Mark a task as done
node dist/index.js done 1

# Delete a task
node dist/index.js delete 1

# Clear all completed tasks
node dist/index.js clear
```

## Example

```
$ node dist/index.js add "Learn TypeScript"
Added task #1: "Learn TypeScript"

$ node dist/index.js add "Build a CLI app"
Added task #2: "Build a CLI app"

$ node dist/index.js list
Pending:
  [ ] #1   Learn TypeScript
  [ ] #2   Build a CLI app

Total: 2 pending, 0 completed

$ node dist/index.js done 1
Completed task #1: "Learn TypeScript"

$ node dist/index.js list --all
Pending:
  [ ] #2   Build a CLI app

Completed:
  [x] #1   Learn TypeScript

Total: 1 pending, 1 completed
```

## Project Structure

```
src/
├── index.ts           # CLI entry point
├── commands/          # Command handlers
│   ├── add.ts
│   ├── list.ts
│   ├── done.ts
│   ├── delete.ts
│   └── clear.ts
├── models/
│   └── task.ts        # Task type definitions
└── storage/
    └── fileStorage.ts # JSON file persistence
```

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Commander.js** - CLI framework
- **Node.js** - Runtime environment

## License

MIT
