import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  todos$!: Observable<ITodo[]>

  constructor(private todoService: TodoService) {
  }

  ngOnInit():void {
    this.todos$ = this.todoService.getTodos()
    }

}
