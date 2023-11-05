import { createAction, props } from '@ngrx/store';
import { ITodo } from '../models/todo.model';

export const enum TodoAction {
  loadTodos = '[Todos] Load todos',
  todosLoaded = '[Todos] Todos loaded',
  errorLoadTodos = '[Todos] Error during loading todos',

  createTodo = '[Todo] Create new todo',
  todoCreated = '[Todo] New todo created',
  errorTodo = '[Todo] Error during create todo',

  editTodo = '[Todo] Edit a todo',
  todoEdited = '[Todo] A todo edited',
  errorEditTodo = '[Todo] Error during edit todo',

  removeTodo = '[Todo] Remove todo from the list',
  todoRemoved = '[Todo] Todo removed from the list',
  errorRemoveTodo = '[Todo] Error during remove todo',
}

export namespace TodoActions {
  export const loadTodos = createAction(TodoAction.loadTodos);
  export const todoLoaded = createAction(TodoAction.todosLoaded, props<{ todos: ITodo[] }>());
  export const errorLoadTodos = createAction(TodoAction.errorLoadTodos, props<{ error: Error }>());

  export const createTodo = createAction(TodoAction.createTodo, props<{ todo: ITodo }>());
  export const todoCreated = createAction(TodoAction.todoCreated, props<{ todo: ITodo }>());
  export const errorTodo = createAction(TodoAction.errorTodo, props<{ error: Error }>());

  export const editTodo = createAction(TodoAction.editTodo, props<{ todo: ITodo }>());
  export const todoEdited = createAction(TodoAction.todoEdited, props<{ todo: ITodo }>());
  export const errorEditTodo = createAction(TodoAction.errorEditTodo, props<{ error: Error }>());

  export const removeTodo = createAction(TodoAction.removeTodo, props<{ id: number }>());
  export const todoRemoved = createAction(TodoAction.todoRemoved, props<{ id: number }>());
  export const errorRemoveTodo = createAction(TodoAction.errorRemoveTodo, props<{ error: Error }>());
}
