import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITodo } from '../models/todo.model';
import { TodoActions } from '../store/todo.actions';
import { filter, Observable } from 'rxjs';
import { TodoSelectors } from '../store/todo.selectors';
import { RadioButton } from '../constants/radio-button.enum';

@Injectable()
export class TodoFacadeService {
  constructor(private store: Store) {}

  createNewTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.createTodo({ todo }));
  }

  initTodos(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  getTodos(): Observable<ITodo[]> {
    return this.store.select(TodoSelectors.selectTodos)
      .pipe(filter(Boolean));
  }

  getTodoById(id: number): Observable<ITodo> {
    return this.store.select(TodoSelectors.selectTodoById(id));
  }

  editTodo(id: number, title: string, status: `${ RadioButton }`): void {
    this.store.dispatch(TodoActions.editTodo({ id, title, status }));
  }

  removeTodo(id: number): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }
}
