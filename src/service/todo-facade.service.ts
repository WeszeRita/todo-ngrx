import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ITodo } from '../models/todo.model';
import { NewTodoActions } from '../store/todo.actions';
import { filter, Observable } from 'rxjs';
import { TodoSelectors } from '../store/todo.selectors';

@Injectable()
export class TodoFacadeService {
  constructor(private store: Store) {}

  createNewTodo(todo: ITodo): void {
    this.store.dispatch(NewTodoActions.createTodo({ todo }));
  }

  getTodos(): Observable<ITodo[]> {
    return this.store.select(TodoSelectors.selectTodos)
      .pipe(filter(Boolean));
  }
}
