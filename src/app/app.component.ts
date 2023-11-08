import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ITodo } from '../models/todo.model';
import { TodoFacadeService } from '../service/todo-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  // selectedTodo: ITodo;
  // isCancelled: boolean;
  todos$: Observable<ITodo[]>;
  // isCancelledOnCard: boolean;

  constructor(private todoFacadeService: TodoFacadeService) {
  }

  ngOnInit(): void {
    this.todoFacadeService.initTodos();         // TODO: move to the card comp? (+rename the action)
    this.todos$ = this.todoFacadeService.getTodos();
  }

}
