import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITodo } from '../models/todo.model';

@Injectable()
export class TodoService {
  private readonly url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getAllTodosFromDb(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.url);
  }

  createNewTodo(todo: ITodo): Observable<ITodo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    return this.http.post<ITodo>(this.url, { ...todo}, options);
  }
}
