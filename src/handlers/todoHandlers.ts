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
  const todo = todoStore.createTodo(title, completed);
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
  const todo = todoStore.updateTodo(req.params.id, { title, completed });
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
