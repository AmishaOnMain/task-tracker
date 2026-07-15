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

if (command === "add") {
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
    id: id,

    description: description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(task);
  saveTasks(tasks);
  console.log(`task successfully added (ID: ${id})`);
}

if (command === "list") {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }
  for (const task of tasks) {
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
}

if (command === "update") {
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
}

if (command === "delete") {
  const tasks = loadTasks();

  const id = Number(args[1]);
  const updatedTasks = tasks.filter((item) => item.id !== id);
  if (tasks.length === updatedTasks.length) {
    console.log("Task not found.");
    return;
  }
  saveTasks(updatedTasks);
  console.log(`task deleted with id: ${id}`);
}


if (command === "mark-done") {
  const tasks = loadTasks();
  const id = Number(args[1]);
  
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.log("Task not found");
    return;
  }
  
  task.status="done"
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task marked as done successfully (ID: ${id})`);
}

if (command === "mark-in-progress") {
  const tasks = loadTasks();
  const id = Number(args[1]);
  
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    console.log("Task not found");
    return;
  }
  
  task.status="in-progress"
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task marked in-progress successfully (ID: ${id})`);
}


if (command === "list-done") {
  const tasks = loadTasks();
  const updatedTasks = tasks.filter((item) => item.status === "done");
  if (tasks.length === updatedTasks.length) {
    console.log("Tasks not found.");
    return;
  }
  
  console.log(`
  -----------------------------------------
  ID: {updatedTasks.id}
  Description: {updatedTasks.description} 
  Status: {updatedTasks.status}
  Added At: {updatedTasks.addedAt}
  Updated At: {updatedTasks.updatedAt}
  -----------------------------------------
  `);
}
