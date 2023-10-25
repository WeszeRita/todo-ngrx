import { createAction, props } from '@ngrx/store';
import { ITodo } from '../models/todo.model';

export const enum NewTodoAction {
  createTodo = '[Todo] Create new todo',
  todoCreated = '[Todo] New todo created',
  errorTodo = '[Todo] Error during process',
}

export namespace NewTodoActions {
  export const createTodo = createAction(NewTodoAction.createTodo, props<{ todo: ITodo }>());

  export const todoCreated = createAction(NewTodoAction.todoCreated, props<{ todo: ITodo }>());

  export const errorTodo = createAction(NewTodoAction.errorTodo, props<{ error: Error }>());
}


// TODO: name convection?

// TODO:
// question:
// interface PropsTodo {
//   todo: ITodo
// }
//
// ->
//
// props<{ PropsTodo }>())
