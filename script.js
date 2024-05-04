const backendUrl = 'http://10.10.1.184:3000/api';

document.addEventListener("DOMContentLoaded", fetchTasks);

async function fetchTasks() {
  try {
    const response = await fetch (`http://10.10.1.184:3000/api/tasks`);
    const data = await response.json();
    const taskList = document.getElementById("task-list");

    taskList.innerHTML = ""; 
    data.response.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task}, this.checked)">
        <span>${task.text}</span>
        <button onclick="deleteTask(${task.id})">Delete</button>
      `;
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}


async function createTask() {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();

  if (taskText) {
    try {
      const response = await fetch('http://10.10.1.184:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: taskText })
      });

      if (response.ok) {
        taskInput.value = "";
        fetchTasks();
      } else {
        console.error("HTTP error:", response.status);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  } else {
    alert("Task cannot be empty");
  }
}


async function toggleTask(id, isCompleted) {
  try {
    const response = await fetch(`http://10.10.1.184:3000/api/tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: isCompleted })
    });

    if (response.ok) {
      fetchTasks(); 
    } else {

      console.error("HTTP error:", response.status);
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
}


async function deleteTask(id) {
  try {
    const response = await fetch(`http://10.10.1.184:3000/api/tasks`, {
      method: 'DELETE'
    });

    if (response.ok) {
      fetchTasks(); 
    } else {
      console.error("Error deleting task:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

