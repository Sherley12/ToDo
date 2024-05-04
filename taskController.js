const taskModel = require('./taskModel');
const { getConnection } = require('./db');


async function getAllTasks(req, res) {
    try {
      const tasks = await taskModel.getAllTasks();
      if (!tasks.length) {
        return res.status(404).json({ response: { success: false, message: 'No tasks found' } });
      }
      res.status(200).json({ response: { success: true, tasks } });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ response: { success: false, message: 'Internal Server Error' } });
    }
  }

async function getTaskById(req, res) {
    try {
      const task = await taskModel.getTaskById(req.params.id);
      if (!task) {
        return res.status(404).json({ response: { success: false, message: 'Task not found' } });
      }
      res.status(200).json({ response: { success: true, task } });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ response: { success: false, message: 'Internal Server Error' } });
    }
  }

async function createTask(req, res) {
    try {
      const { text, completed = false } = req.body;
      if (!text || typeof text !== 'string' || text.trim() === '') {
        return res.status(400).json({ response: { success: false, message: 'Invalid task data' } });
      }
  
      const taskId = await taskModel.createTask({ text: text.trim(), completed });
      res.status(201).json({ response: { success: true, message: 'Task created', id: taskId } });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ response: { success: false, message: 'Internal Server Error' } });
    }
  }

async function updateTask(req, res) {
    try {
      const { text, completed } = req.body;
      if (!text || typeof text !== 'string' || text.trim() === '') {
        return res.status(400).json({ response: { success: false, message: 'Invalid task data' } });
      }
  
      const taskId = req.params.id;
      await taskModel.updateTask(taskId, { text: text.trim(), completed });
      res.status(200).json({ response: { success: true, message: 'Task updated' } });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ response: { success: false, message: 'Internal Server Error' } });
    }
  }
  

async function deleteTask(req, res) {
    try {
      const taskId = req.params.id;
      await taskModel.deleteTask(taskId);
      res.status(200).json({ response: { success: true, message: 'Task deleted' } });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ response: { success: false, message: 'Internal Server Error' } });
    }
  }

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
  };



