import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState } from './todo.reducer';

export const todoFeatureKey = 'todo';

export namespace TodoSelectors {
  const selectTodoFeature = createFeatureSelector<ITodoState>(todoFeatureKey);

  export const selectTodos = createSelector(
    selectTodoFeature,
    (state: ITodoState) => state.todos,
  );

}
