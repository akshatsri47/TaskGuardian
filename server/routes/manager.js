import express from 'express';
import Task from '../model/Task.js';
import { authenticateRole } from '../middleware/authenticate.js';

const router = express.Router();

// Route for creating a new task (accessible to Admin and Manager)
router.post('/tasks', authenticateRole('Admin', 'Manager'), async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    // Create the new task
    const newTask = new Task({ title, description, assignedTo });
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for updating task information (accessible to Admin and Manager)
router.put('/tasks/:taskId', authenticateRole('Admin', 'Manager'), async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, assignedTo } = req.body;

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update task information
    task.title = title;
    task.description = description;
    task.assignedTo = assignedTo;
    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for deleting a task (accessible to Admin and Manager)
router.delete('/tasks/:taskId', authenticateRole('Admin', 'Manager'), async (req, res) => {
  try {
    const { taskId } = req.params;

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
