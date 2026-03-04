import express from 'express'

import {
  createTask,
  getTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  suggestTaskByEnergy,
} from '../controllers/tasks.controller.js'

import {
  createTaskValidation,
  updateTaskValidation,
} from '../validations/taskValidation.js'

import {uuidParamValidation} from '../validations/paramValidation.js'

import {authenticate} from '../middlewares/auth.middleware.js'

const router = express.Router()

// POST /api/tasks
router.post('/tasks', authenticate, createTaskValidation, createTask)

// GET /api/tasks
router.get('/tasks', authenticate, getTasks)

// GET /api/tasks/:id
router.get('/tasks/:id', authenticate, uuidParamValidation, getTaskById)

// DELETE /api/tasks/:id
router.delete('/tasks/:id', authenticate, uuidParamValidation, deleteTaskById)

// PUT /api/tasks/:id
router.put(
  '/tasks/:id',
  authenticate,
  uuidParamValidation,
  updateTaskValidation,
  updateTaskById,
)

router.get('/tasks/suggest', authenticate, suggestTaskByEnergy)

export default router
