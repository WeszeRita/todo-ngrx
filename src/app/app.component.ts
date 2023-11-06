import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITodo } from '../models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent{
  selectedTodo: ITodo;

  selectedTodoEmitted(todo: ITodo) {
    this.selectedTodo = todo;
  }
}
