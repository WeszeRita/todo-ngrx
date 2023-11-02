import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState } from './todo.reducer';
import { ITodo } from '../models/todo.model';

export const todoFeatureKey = 'todo';

export namespace TodoSelectors {
  const selectTodoFeature = createFeatureSelector<ITodoState>(todoFeatureKey);

  export const selectTodos = createSelector(
    selectTodoFeature,
    (state: ITodoState) => state.todos,
  );

  export const selectTodoById = (todoId: number)  =>  createSelector(
    selectTodos,
    (todos: ITodo[]) => todos.find((todo) => todo.id === todoId)
  );
}
