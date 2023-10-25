import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TodoService } from '../service/todo.service';
import { NewTodoActions } from './todo.actions';
import { ITodo } from '../models/todo.model';

@Injectable()
export class TodoEffects {
  createTodo$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(NewTodoActions.createTodo),
      switchMap(({ todo }) => {
        return this.todoService.createNewTodo(todo)
          .pipe(
            map((todo: ITodo) => NewTodoActions.todoCreated({ todo })),
            catchError((error: Error) => of(NewTodoActions.errorTodo({ error }))),
          );
      }),
    ),
  );

  constructor(private actions$: Actions, private todoService: TodoService) {
  }
}
