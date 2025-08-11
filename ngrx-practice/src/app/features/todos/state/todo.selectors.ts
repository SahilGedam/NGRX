import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTodoState = createFeatureSelector<any>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectLoading = createSelector(
  selectTodoState,
  (state) => state.loading
);
