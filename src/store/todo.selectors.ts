import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState } from './todo.reducer';

export const todoFeatureKey = 'todo';
export const editingIdFeatureKey = 'editingId';

export namespace TodoSelectors {
  const selectTodoFeature = createFeatureSelector<ITodoState>(todoFeatureKey);
  const editingIdFeature = createFeatureSelector<ITodoState>(editingIdFeatureKey);

  export const selectTodos = createSelector(
    selectTodoFeature,
    (state: ITodoState) => state.todos,
  );

  export const editingId = createSelector(
    editingIdFeature,
    (state: ITodoState) => state.editingId,
  );

}
