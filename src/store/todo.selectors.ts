import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState } from './todo.reducer';
import { ITodo } from '../models';

export const todoFeatureKey = 'todo';

export namespace TodoSelectors {
  const selectTodoFeature = createFeatureSelector<ITodoState>(todoFeatureKey);

  export const selectTodos = createSelector(
    selectTodoFeature,
    (state: ITodoState) => state.todos,
  );

  export const editingId = createSelector(
    selectTodoFeature,
    (state: ITodoState) => state.selectedId,
  );

  export const selectTodoById = (todoId: number) => createSelector(
    selectTodos,
    (todos: ITodo[]) => {
      if (!todos) {
        return undefined;
      }

      return todos.find((todo) => todo.id === todoId);
    }
  );
}
