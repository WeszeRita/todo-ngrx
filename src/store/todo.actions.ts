import { createAction, props } from '@ngrx/store';
import { ITodo } from '../models/todo.model';

export const enum TodoAction {
  loadTodos = '[Todo] Load todos',           // inside [] - module name or component name? - Answer: Not module and not component :) It should be the topic what you're storing in Store - [Group/Topic]
  todosLoaded = '[Todo] Todos loaded',
  errorLoadTodos = '[Todo] Load todos error',

  createTodo = '[Todo] Create todo',
  todoCreated = '[Todo] New todo created',
  errorCreateTodo = '[Todo] Create todo error',

  selectTodoId = '[Todo] Select todo id',

  editTodo = '[Todo] Edit todo',
  todoEdited = '[Todo] Todo edited',
  errorEditTodo = '[Todo] Edit todo error',

  removeTodo = '[Todo] Remove todo', // we don't need the explanation here where it will be removed
  todoRemoved = '[Todo] Todo removed',
  errorRemoveTodo = '[Todo] Remove todo error',
}

export namespace TodoActions {
  export const loadTodos = createAction(TodoAction.loadTodos);
  export const todoLoaded = createAction(TodoAction.todosLoaded, props<{ todos: ITodo[] }>());
  export const errorLoadTodos = createAction(TodoAction.errorLoadTodos, props<{ error: Error }>());

  export const createTodo = createAction(TodoAction.createTodo, props<{ todo: ITodo }>());
  export const todoCreated = createAction(TodoAction.todoCreated, props<{ todo: ITodo }>());
  export const errorTodo = createAction(TodoAction.errorCreateTodo, props<{ error: Error }>());

  export const selectTodoId = createAction(TodoAction.selectTodoId, props<{ id: number }>());

  export const editTodo = createAction(TodoAction.editTodo, props<{ todo: ITodo }>());
  export const todoEdited = createAction(TodoAction.todoEdited, props<{ todo: ITodo }>());
  export const errorEditTodo = createAction(TodoAction.errorEditTodo, props<{ error: Error }>());

  export const removeTodo = createAction(TodoAction.removeTodo, props<{ id: number }>());
  export const todoRemoved = createAction(TodoAction.todoRemoved, props<{ id: number }>());
  export const errorRemoveTodo = createAction(TodoAction.errorRemoveTodo, props<{ error: Error }>());
}
