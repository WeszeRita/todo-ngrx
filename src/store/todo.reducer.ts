import { createReducer, on } from '@ngrx/store';

import { ITodo } from '../models/todo.model';
import { TodoActions } from './todo.actions';
import { state } from '@angular/animations';

export const todoFeatureKey = 'todo';

export interface ITodoState {
  todos?: ITodo[];
  error?: Error;
}

export const initialState: ITodoState = {
  todos: undefined,
  error: undefined,
}

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({
    ...state,
  })),
  on(TodoActions.todoLoaded, (state, action) => ({
    ...state,
    todos: action.todos,
  })),
  on(TodoActions.todoCreated, (state, action) => ({
    ...state,
    todos: [...(state.todos || []), action.todo],
  })),
)
