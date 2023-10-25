import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ITodo } from '../models/todo.model';
import { NewTodoActions } from '../store/todo.actions';

@Injectable()
export class TodoFacadeService {
  constructor(private store: Store) {}

  createNewTodo(todo: ITodo): void {
    this.store.dispatch(NewTodoActions.createTodo({ todo }));
  }
}
