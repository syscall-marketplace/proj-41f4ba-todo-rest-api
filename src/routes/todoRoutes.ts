import { Router } from 'express';
import {
  createTodoHandler,
  getAllTodosHandler,
  getTodoByIdHandler,
  updateTodoHandler,
  deleteTodoHandler,
} from '../handlers/todoHandlers.js';
import { healthCheckHandler } from '../handlers/healthHandler.js';
import { validateCreateTodo, validateUpdateTodo } from '../middleware/validation.js';

const router = Router();

// Health check
router.get('/health', healthCheckHandler);

// Todo CRUD routes
router.post('/todos', validateCreateTodo, createTodoHandler);
router.get('/todos', getAllTodosHandler);
router.get('/todos/:id', getTodoByIdHandler);
router.put('/todos/:id', validateUpdateTodo, updateTodoHandler);
router.delete('/todos/:id', deleteTodoHandler);

export default router;
