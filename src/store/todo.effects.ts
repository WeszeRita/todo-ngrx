import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../service';
import { TodoActions } from './todo.actions';
import { ITodo } from '../models';

@Injectable()
export class TodoEffects {
  createTodo$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.createTodo),
        switchMap(({ todo }) => {
          return this.todoService.createNewTodo(todo)
            .pipe(
              map((todo: ITodo) => TodoActions.todoCreated({ todo })),
              catchError((error: Error) => of(TodoActions.errorTodo({ error }))),
            );
        }),
      );
  });

  loadTodos$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.loadTodos),
        switchMap(() => {
          return this.todoService.getTodos()
            .pipe(
              map((todos: ITodo[]) => TodoActions.todoLoaded({ todos: todos })),
              catchError((error) => of(TodoActions.errorLoadTodos({ error: new Error(error) }))),
            );
        }),
      );
  });

  editTodo$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.editTodo),
        switchMap(({ todo }) => {
          return this.todoService.editTodo(todo)
            .pipe(
              map((todo: ITodo) => TodoActions.todoEdited({ todo })),
              catchError((error) => of(TodoActions.errorEditTodo({ error }))),
            );
        }),
      );
  });

  removeTodo$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.removeTodo),
        switchMap(({ id }) => {

          return this.todoService.removeTodo(id)
            .pipe(
              map(() => TodoActions.todoRemoved({ id })),
              catchError((error) => of(TodoActions.errorRemoveTodo({ error }))),
            );
        }),
      );
  });

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
