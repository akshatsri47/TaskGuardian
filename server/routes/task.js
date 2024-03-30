import express from 'express';
import Task from '../model/Task.js';
import { authenticateRole } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/tasks', authenticateRole('Admin', 'Manager', 'Regular User'), async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;

    const newTask = new Task({ title, description, assignedTo, status });
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/tasks/:taskId', authenticateRole('Admin', 'Manager', 'Regular User'), async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, assignedTo, status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    task.assignedTo = assignedTo;
    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/tasks/:taskId', authenticateRole('Admin', 'Manager', 'Regular User'), async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/tasks', authenticateRole('Admin', 'Manager', 'Regular User'), async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
