import { createReducer, on } from '@ngrx/store';
import { ITodo } from '../models/todo.model';
import { TodoActions } from './todo.actions';
import errorRemoveTodo = TodoActions.errorRemoveTodo;

export interface ITodoState {
  todos: ITodo[];
  error: Error;
}

export const initialState: ITodoState = {
  todos: undefined,
  error: undefined,
}

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.todoLoaded, (state, action) => ({
    ...state,
    todos: action.todos,
  })),
  on(TodoActions.todoCreated, (state, action) => ({
    ...state,
    todos: [...(state.todos), action.todo],
  })),
  on(TodoActions.todoRemoved, (state, action) => ({
      ...state,
      todos: state.todos.filter((item) => item.id !== action.id),
  })),
)
