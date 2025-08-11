import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectAllTodos } from '../state/todo.selectors';
import * as TodoActions from '../state/todo.actions';

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

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.store.select(selectAllTodos).subscribe(todos => {
      const todo = todos.find(t => t.id === this.id);
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
}