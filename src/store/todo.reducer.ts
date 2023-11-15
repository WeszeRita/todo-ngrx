import { createReducer, on } from '@ngrx/store';
import { ITodo } from '../models/todo.model';
import { TodoActions } from './todo.actions';

export interface ITodoState {
  todos: ITodo[];
  selectedId: number;
  error: Error;
}

export const initialState: ITodoState = {
  todos: undefined,
  selectedId: undefined,
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
  on(TodoActions.selectTodoId, (state, action) => ({
    ...state,
    selectedId: action.id,
  })),
  on(TodoActions.todoRemoved, (state, action) => ({
      ...state,
      todos: state.todos.filter((item) => item.id !== action.id),
  })),
  on(
    TodoActions.errorLoadTodos,
    TodoActions.errorTodo,
    TodoActions.errorEditTodo,
    TodoActions.errorRemoveTodo,
    (state, action) => ({
    ...state,
    error: action.error
  })),
)
