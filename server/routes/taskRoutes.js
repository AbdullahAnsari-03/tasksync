// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const protect = require('../middlewares/auth');

// All routes here require authentication
router.use(protect);

// @route   GET /api/tasks
router.get('/', getTasks);

// @route   POST /api/tasks
router.post('/', createTask);

// @route   PUT /api/tasks/:id
router.put('/:id', updateTask);

// @route   DELETE /api/tasks/:id
router.delete('/:id', deleteTask);

module.exports = router;