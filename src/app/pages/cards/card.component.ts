import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { ITodo } from '../../../models/todo.model';
import { TodoFacadeService } from '../../../service/todo-facade.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input()
  todo: ITodo;

  constructor(private todoFacadeService: TodoFacadeService) {
  }

  toggleEdit(): void {
  }

  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
  }
}
