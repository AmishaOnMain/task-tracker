# Task Tracker CLI

A simple Command Line Interface (CLI) application built with Node.js to manage your daily tasks. Tasks are stored locally in a `tasks.json` file using Node.js' built-in `fs` module.

## Features

* Add a new task
* Update an existing task
* Delete a task
* Mark a task as **done**
* Mark a task as **in-progress**
* List all tasks
* Filter tasks by status (`todo`, `done`, `in-progress`)

## Tech Stack

* Node.js
* JavaScript
* File System (`fs`) Module
* JSON

## Project Structure

```text
task-tracker/
├── task-cli.js
├── tasks.json
├── package.json
└── README.md
```

## How to Use

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd task-tracker
   ```

2. Install dependencies (if needed):

   ```bash
   npm install
   ```

3. Run any of the following commands:

   ```bash
   # Add a task
   node task-cli.js add "Learn Node.js"

   # List all tasks
   node task-cli.js list

   # List tasks by status
   node task-cli.js list done
   node task-cli.js list todo
   node task-cli.js list in-progress

   # Update a task
   node task-cli.js update 1 "Learn Express.js"

   # Delete a task
   node task-cli.js delete 1

   # Mark a task as done
   node task-cli.js mark-done 1

   # Mark a task as in progress
   node task-cli.js mark-in-progress 1
   ```

> **Note:** If `tasks.json` doesn't exist, create it in the project root with the following initial content:
>
> ```json
> []
> ```

## Task Properties

Each task contains:

* `id`
* `description`
* `status` (`todo`, `in-progress`, or `done`)
* `createdAt`
* `updatedAt`

## License

This project is licensed under the MIT License.
