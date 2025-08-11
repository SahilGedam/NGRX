import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllTodos, selectLoading } from '../state/todo.selectors';
import * as TodoActions from '../state/todo.actions';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-todo-dashboard',
  imports: [CommonModule],
  templateUrl: './todo-dashboard.html',
  styleUrl: './todo-dashboard.css'
})
export class TodoDashboard implements OnInit {
  todos$!: Observable<any[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.todos$ = this.store.select(selectAllTodos);
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(TodoActions.loadTodos());
  }

  deleteTodo(id: number) {
    if (confirm('Delete this todo?')) {
      this.store.dispatch(TodoActions.deleteTodo({ id }));
    }
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }

  goToUpdate(todoId: number) {
    this.router.navigate(['/update', todoId]);
  }
}
