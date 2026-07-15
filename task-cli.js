const fs = require("fs");
const args = process.argv.slice(2);
const command = args[0];
const description = args[1];

function loadTasks() {
  const data = fs.readFileSync("tasks.json", "utf8");
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
}

switch (command) {
  case "add": {
    if (!description) {
      console.log("Please provide a task description.");
      return;
    }

    const tasks = loadTasks();
    let id;
    if (tasks.length === 0) {
      id = 1;
    } else {
      id = tasks[tasks.length - 1].id + 1;
    }
    const task = {
      id,
      description,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(task);
    saveTasks(tasks);
    console.log(`task successfully added (ID: ${id})`);
    break;
  }

  case "list": {
    const tasks = loadTasks();
    const status = args[1];
    let filteredTasks = tasks;
    if (status) {
      filteredTasks = tasks.filter((task) => task.status === status);
    }

    if (filteredTasks.length === 0) {
      console.log("No matching tasks found.");
      return;
    }
    for (const task of filteredTasks) {
      console.log(`
--------------------------------------
ID: ${task.id}
Description: ${task.description}
Status: ${task.status}
Created At: ${task.createdAt}
Updated At: ${task.updatedAt}
--------------------------------------
    `);
    }
    break;
  }

  case "update": {
    const tasks = loadTasks();
    const id = Number(args[1]);
    const newDescription = args[2];
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      console.log("Task not found");
      return;
    }
    if (!newDescription) {
      console.log("Please provide a new description.");
      return;
    }
    task.description = newDescription;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task updated successfully (ID: ${id})`);
    break;
  }

  case "delete": {
    const tasks = loadTasks();

    const id = Number(args[1]);
    const updatedTasks = tasks.filter((item) => item.id !== id);
    if (tasks.length === updatedTasks.length) {
      console.log("Task not found.");
      return;
    }
    saveTasks(updatedTasks);
    console.log(`task deleted with id: ${id}`);
    break;
  }

  case "mark-done": {
    const tasks = loadTasks();
    const id = Number(args[1]);

    const task = tasks.find((task) => task.id === id);
    if (!task) {
      console.log("Task not found");
      return;
    }

    task.status = "done";
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task marked as done successfully (ID: ${id})`);
    break;
  }

  case "mark-in-progress": {
    const tasks = loadTasks();
    const id = Number(args[1]);

    const task = tasks.find((task) => task.id === id);
    if (!task) {
      console.log("Task not found");
      return;
    }

    task.status = "in-progress";
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task marked in-progress successfully (ID: ${id})`);
    break;
  }
  default: {
    console.log(`
      Usage:
      node task-cli.js add "Task description"
      node task-cli.js list
      node task-cli.js list done
      node task-cli.js list todo
      node task-cli.js list in-progress
      node task-cli.js update <id> "New description"
      node task-cli.js delete <id>
      node task-cli.js mark-done <id>
      node task-cli.js mark-in-progress <id>
    `);
  }
}
