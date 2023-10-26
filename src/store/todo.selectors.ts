import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ITodoState, todoFeatureKey } from './todo.reducer';

export namespace TodoSelectors {
  const selectTodoFeature = createFeatureSelector<ITodoState>(todoFeatureKey);

  export const selectTodos = createSelector(
    selectTodoFeature,
    (state: ITodoState) => state.todos,
  );
}
