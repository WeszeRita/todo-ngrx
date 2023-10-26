import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ITodo } from '../models/todo.model';
import { TodoFacadeService } from '../service/todo-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  todos$!: Observable<ITodo[]>

  constructor(private todoFacadeService: TodoFacadeService) {}

  ngOnInit():void {
    this.todoFacadeService.initTodosFromStore();
    this.todos$ = this.todoFacadeService.getAllTodosFromStore();
    }
}
