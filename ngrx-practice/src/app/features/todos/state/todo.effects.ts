import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TodoActions from './todo.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TodoEffects {
  private apiUrl = 'http://localhost:3000/todos';

  loadTodos$;
  addTodo$;
  updateTodo$;
  deleteTodo$;

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {
    this.loadTodos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.loadTodos),
        mergeMap(() =>
          this.http.get<any[]>(this.apiUrl).pipe(
            map(todos => TodoActions.loadTodosSuccess({ todos })),
            catchError(error => of(TodoActions.loadTodosFailure({ error })))
          )
        )
      )
    );

    this.addTodo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.addTodo),
        mergeMap(action =>
          this.http.post<any>(this.apiUrl, action.todo).pipe(
            map(todo => TodoActions.addTodoSuccess({ todo })),
            catchError(error => of(TodoActions.addTodoFailure({ error })))
          )
        )
      )
    );

    this.updateTodo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.updateTodo),
        mergeMap(action =>
          this.http.put<any>(`${this.apiUrl}/${action.todo.id}`, action.todo).pipe(
            map(todo => TodoActions.updateTodoSuccess({ todo })),
            catchError(error => of(TodoActions.updateTodoFailure({ error })))
          )
        )
      )
    );

    this.deleteTodo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TodoActions.deleteTodo),
        mergeMap(action =>
          this.http.delete<any>(`${this.apiUrl}/${action.id}`).pipe(
            map(() => TodoActions.deleteTodoSuccess({ id: action.id })),
            catchError(error => of(TodoActions.deleteTodoFailure({ error })))
          )
        )
      )
    );
  }
}
