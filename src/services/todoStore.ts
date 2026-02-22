import crypto from 'crypto';
import { Todo } from '../types/todo.js';

export class TodoStore {
  private todos: Todo[] = [];

  createTodo(title: string, completed?: boolean): Todo {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: completed ?? false,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  getAllTodos(): Todo[] {
    return [...this.todos];
  }

  getTodoById(id: string): Todo | null {
    return this.todos.find((todo) => todo.id === id) ?? null;
  }

  updateTodo(id: string, updates: Partial<Pick<Todo, 'title' | 'completed'>>): Todo | null {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      return null;
    }
    if (updates.title !== undefined) {
      todo.title = updates.title;
    }
    if (updates.completed !== undefined) {
      todo.completed = updates.completed;
    }
    return todo;
  }

  deleteTodo(id: string): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return false;
    }
    this.todos.splice(index, 1);
    return true;
  }
}

export const todoStore = new TodoStore();
