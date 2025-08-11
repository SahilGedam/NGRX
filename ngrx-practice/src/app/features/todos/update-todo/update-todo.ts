import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectAllTodos, selectTodoById } from '../state/todo.selectors';
import * as TodoActions from '../state/todo.actions';
import { take } from 'rxjs';

@Component({
  selector: 'app-update-todo',
  imports: [CommonModule, FormsModule],

  templateUrl: './update-todo.html',
  styleUrl: './update-todo.css'
})
export class UpdateTodo implements OnInit {
  title: string = '';
  completed: boolean = false;
  id!: number;
  todo$: any;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) { }

ngOnInit() {
  this.id = +this.route.snapshot.paramMap.get('id')!;

  this.store.select(selectAllTodos).pipe(take(1)).subscribe(todos => {
    if (!todos || todos.length === 0) {
      this.store.dispatch(TodoActions.loadTodos());
    }
  });

  this.store.select(selectTodoById(this.id)).subscribe(todo => {

    console.log(todo)
    if (todo) {
      this.title = todo.title;
      this.completed = todo.completed;
    }
  });
}





  updateTodo() {
    if (!this.title.trim()) {
      alert('Title is required');
      return;
    }
    const updatedTodo = { id: this.id, title: this.title, completed: this.completed };
    this.store.dispatch(TodoActions.updateTodo({ todo: updatedTodo }));
    this.router.navigate(['/todos']);
  }
  goTo(path: string) {
    this.router.navigate([path]);
  }
}