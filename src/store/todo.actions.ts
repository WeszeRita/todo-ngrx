import { createAction, props } from '@ngrx/store';
import { ITodo } from '../models/todo.model';

export const enum TodoAction {
  loadTodos = '[Todos] Load todos',
  todosLoaded = '[Todos] Todos loaded',
  errorLoadTodos = '[Todos] Error todos',

  createTodo = '[Todo] Create new todo',
  todoCreated = '[Todo] New todo created',
  errorTodo = '[Todo] Error during process',
}

export namespace TodoActions {
  export const loadTodos = createAction(TodoAction.loadTodos);
  export const todoLoaded = createAction(TodoAction.todosLoaded, props<{ todos: ITodo[] }>());
  export const errorLoadTodos = createAction(TodoAction.errorLoadTodos, props<{ error: Error }>());

  export const createTodo = createAction(TodoAction.createTodo, props<{ todo: ITodo }>());
  export const todoCreated = createAction(TodoAction.todoCreated, props<{ todo: ITodo }>());
  export const errorTodo = createAction(TodoAction.errorTodo, props<{ error: Error }>());
}
