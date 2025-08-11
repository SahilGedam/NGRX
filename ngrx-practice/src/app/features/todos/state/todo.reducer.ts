import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

export const initialState: any = {
  todos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialState,

  // Load
  on(TodoActions.loadTodos, (state) => ({ ...state, loading: true })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) => ({ ...state, loading: false, todos })),
  on(TodoActions.loadTodosFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Add
  on(TodoActions.addTodoSuccess, (state, { todo }) => ({ ...state, todos: [...state.todos, todo] })),

  // Update
  on(TodoActions.updateTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t: any) => t.id === todo.id ? todo : t)
  })),

  // Delete
  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((t: any) => t.id !== id)
  }))
);
