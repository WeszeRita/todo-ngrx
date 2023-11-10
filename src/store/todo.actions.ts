import { createAction, props } from '@ngrx/store';
import { ITodo } from '../models/todo.model';

export const enum TodoAction {
  loadTodos = '[App] Load todos',           // inside [] - module name or component name?
  todosLoaded = '[App] Todos loaded',
  errorLoadTodos = '[App] Error during loading todos',

  createTodo = '[Form] Create new todo',
  todoCreated = '[Form] New todo created',
  errorCreateTodo = '[Form] Error during create todo',

  selectTodoId = '[Card] Select todoId',
  // todoIdSelected = '[Card] todoId selected',
  // errorSelectTodoId = '[Todo] Error during select todoId',     don't need it, there is no http request?

  editTodo = '[Form] Edit a todo',
  todoEdited = '[Form] A todo edited',
  errorEditTodo = '[Form] Error during edit todo',

  removeTodo = '[Card] Remove todo from the list',
  todoRemoved = '[Card] Todo removed from the list',
  errorRemoveTodo = '[Card] Error during remove todo',
}

export namespace TodoActions {
  export const loadTodos = createAction(TodoAction.loadTodos);
  export const todoLoaded = createAction(TodoAction.todosLoaded, props<{ todos: ITodo[] }>());
  export const errorLoadTodos = createAction(TodoAction.errorLoadTodos, props<{ error: Error }>());

  export const createTodo = createAction(TodoAction.createTodo, props<{ todo: ITodo }>());
  export const todoCreated = createAction(TodoAction.todoCreated, props<{ todo: ITodo }>());
  export const errorTodo = createAction(TodoAction.errorCreateTodo, props<{ error: Error }>());

  export const selectTodoId = createAction(TodoAction.selectTodoId, props<{ id: number }>());
  // export const TodoIdSelected = createAction(TodoAction.todoIdSelected, props<{ id: number }>());

  export const editTodo = createAction(TodoAction.editTodo, props<{ todo: ITodo }>());
  export const todoEdited = createAction(TodoAction.todoEdited, props<{ todo: ITodo }>());
  export const errorEditTodo = createAction(TodoAction.errorEditTodo, props<{ error: Error }>());

  export const removeTodo = createAction(TodoAction.removeTodo, props<{ id: number }>());
  export const todoRemoved = createAction(TodoAction.todoRemoved, props<{ id: number }>());
  export const errorRemoveTodo = createAction(TodoAction.errorRemoveTodo, props<{ error: Error }>());
}
