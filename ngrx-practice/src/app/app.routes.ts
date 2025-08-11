import { Routes } from '@angular/router';
import { AddTodo } from './features/todos/add-todo/add-todo';
import { TodoDashboard } from './features/todos/todo-dashboard/todo-dashboard';
import { UpdateTodo } from './features/todos/update-todo/update-todo';

export const routes: Routes = [
    { path: '', redirectTo: 'todos', pathMatch: 'full' },
    { path: 'todos', component: TodoDashboard },
    { path: 'add', component: AddTodo },
    { path: 'update/:id', component: UpdateTodo }
];
