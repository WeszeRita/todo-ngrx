import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ITodo } from '../models';
import { TodoFacadeService } from '../service/todo-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos$: Observable<ITodo[]>;
  editedId: number;

  constructor(private todoFacadeService: TodoFacadeService) {}

  ngOnInit(): void {
    this.todoFacadeService.loadTodos();
    this.todos$ = this.todoFacadeService.getTodos();

    // add unsubsctiption or convert it to use of async pipe with shareReply.
    this.todoFacadeService.getEditingTodoId()
      .subscribe((id: number) => {
        this.editedId = id;
      });
  }
}
