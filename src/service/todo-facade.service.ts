import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { ITodo } from '../models';
import { TodoActions, TodoSelectors } from '../store';

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

  selectTotoId(id: number): void {
    return this.store.dispatch(TodoActions.selectTodoId({ id }));
  }

  cancelEditing(): void {
    this.selectTotoId(undefined);
  }

  removeTodo(id: number): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }
}
