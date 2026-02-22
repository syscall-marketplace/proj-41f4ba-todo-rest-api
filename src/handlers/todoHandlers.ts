import { Request, Response } from 'express';
import { todoStore } from '../services/todoStore.js';
import { Todo, TodoResponse } from '../types/todo.js';

function toTodoResponse(todo: Todo): TodoResponse {
  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
  };
}

export async function createTodoHandler(req: Request, res: Response): Promise<void> {
  const { title, completed } = req.body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    res.status(400).json({ error: 'Validation error', message: 'Title is required and must be a non-empty string' });
    return;
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    res.status(400).json({ error: 'Validation error', message: 'Completed must be a boolean' });
    return;
  }

  const todo = todoStore.createTodo(title.trim(), completed);
  res.status(201).json(toTodoResponse(todo));
}

export async function getAllTodosHandler(req: Request, res: Response): Promise<void> {
  const todos = todoStore.getAllTodos();
  res.json(todos.map(toTodoResponse));
}

export async function getTodoByIdHandler(req: Request, res: Response): Promise<void> {
  const todo = todoStore.getTodoById(req.params.id);
  if (!todo) {
    res.status(404).json({ error: 'Not found', message: `Todo with id '${req.params.id}' not found` });
    return;
  }
  res.json(toTodoResponse(todo));
}

export async function updateTodoHandler(req: Request, res: Response): Promise<void> {
  const { title, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    res.status(400).json({ error: 'Validation error', message: 'Title must be a non-empty string' });
    return;
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    res.status(400).json({ error: 'Validation error', message: 'Completed must be a boolean' });
    return;
  }

  const updates: { title?: string; completed?: boolean } = {};
  if (title !== undefined) updates.title = title.trim();
  if (completed !== undefined) updates.completed = completed;

  const todo = todoStore.updateTodo(req.params.id, updates);
  if (!todo) {
    res.status(404).json({ error: 'Not found', message: `Todo with id '${req.params.id}' not found` });
    return;
  }
  res.json(toTodoResponse(todo));
}

export async function deleteTodoHandler(req: Request, res: Response): Promise<void> {
  const deleted = todoStore.deleteTodo(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Not found', message: `Todo with id '${req.params.id}' not found` });
    return;
  }
  res.status(204).send();
}
