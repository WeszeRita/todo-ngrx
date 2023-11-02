import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITodo } from '../models/todo.model';
import { TodoFacadeService } from '../service/todo-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  todos$: Observable<ITodo[]>
  todoId$ = new Subject<number>();

  constructor(private todoFacadeService: TodoFacadeService) {}

  ngOnInit(): void {
    this.todoFacadeService.initTodos();
    this.todos$ = this.todoFacadeService.getTodos();
  }

  onEdit(todoId: number): void {
   // todoId$. = todoId;
   // console.log(todoId);
  }

  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
  }
}
