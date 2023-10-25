import { createReducer, on } from '@ngrx/store';

import { ITodo } from '../models/todo.model';
import { NewTodoActions } from './todo.actions';

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
  on(NewTodoActions.todoCreated, (state, action) => ({
    ...state,
    todos: [...(state.todos || []), action.todo],
  })),
)
