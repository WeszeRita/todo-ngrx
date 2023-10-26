import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { TodoActions } from './todo.actions';
import { ITodo } from '../models/todo.model';
import { TodoService } from '../service/todo.service';

// fix the name of files
@Injectable()
export class LoadTodoEffects {
  // not categories :)
  loadCategories$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(TodoActions.loadTodos),
        switchMap(() => {
          return this.todoService.getAllTodosFromDb()
            .pipe(
              map((todos: ITodo[]) => TodoActions.todoLoaded({ todos: todos })),
              catchError((error) => of(TodoActions.errorLoadTodos({ error: new Error(error) }))),
            );
        }),
      );
  });

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) {}
}
