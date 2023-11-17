import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { TodoActions } from '../store/todo.actions';
import { TodoSelectors } from '../store/todo.selectors';

@Injectable()
export class TodoFacadeService {

  constructor(private store: Store) {}

  createNewTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.createTodo({ todo }));
  }

  loadTodos(): void {
    this.store.dispatch(TodoActions.loadTodos());
  }

  getTodos(): Observable<ITodo[]> {
    return this.store.select(TodoSelectors.selectTodos)
      .pipe(filter(Boolean));
  }

  getEditingTodoId(): Observable<number> {
    return this.store.select(TodoSelectors.editingId);
  }

  getSelectedTodo(id: number): Observable<ITodo> {
    return this.store.select(TodoSelectors.selectTodoById(id));
  }

  editTodo(todo: ITodo): void {
    this.store.dispatch(TodoActions.editTodo({ todo }));
  }

  selectTotoId(id: number) {
    return this.store.dispatch(TodoActions.selectTodoId({ id }));
  }

  removeTodo(id: number): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }
}
