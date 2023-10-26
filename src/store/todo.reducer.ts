import { createReducer, on } from '@ngrx/store';

import { ITodo } from '../models/todo.model';
import { TodoActions } from './todo.actions';

// place feature key in selectors
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
  // we don't need that reducer
  on(TodoActions.loadTodos, (state) => ({
    ...state,
  })),
  on(TodoActions.todoLoaded, (state, action) => ({
    ...state,
    todos: action.todos,
  })),
  on(TodoActions.todoCreated, (state, action) => ({
    ...state,
    // back-end returns empty array if there are no todos there, so we don't need here "|| []"
    todos: [...(state.todos || []), action.todo],
  })),
)
