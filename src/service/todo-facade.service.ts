import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoService } from './todo.service';
import { ITodo } from '../models/todo.model';

@Injectable()
export class TodoFacadeService {
  constructor(private store: Store, private todoService: TodoService) {}

  // getTodos(): Observable<ITodo[]> {
  //   return this.store.select((state: object) => ITodo[]): Observable<ITodo[]>)
  // }
}
