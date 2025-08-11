import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as TodoActions from '../state/todo.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-add-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css'
})
export class AddTodo {
  title: string = '';
  completed: boolean = false;

  constructor(private store: Store, private router: Router) { }

  addTodo() {
    if (!this.title.trim()) {
      alert('Title is required');
      return;
    }
    const newTodo = { title: this.title, completed: this.completed };
    this.store.dispatch(TodoActions.addTodo({ todo: newTodo }));
    this.router.navigate(['/todos']);
  }
}
