import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { ITodo } from '../../../models/todo.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input()
  todo: ITodo;

  @Input()
  editedId: number;

  selectedId$: Observable<number>;
  isEditing = false;

  constructor(private todoFacadeService: TodoFacadeService) {}

  toggleEdit(id: number): void {
    if (this.selectedId$) {
      this.isEditing = false;
      this.todoFacadeService.selectTotoId(undefined);
      this.selectedId$ = undefined;
      return;
    }

    if (!this.selectedId$) {
      this.isEditing = true;
      this.todoFacadeService.selectTotoId(id);
      this.selectedId$ = this.todoFacadeService.getEditingTodoId();
      return;
    }
  }

  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
    this.todoFacadeService.selectTotoId(undefined);
    this.selectedId$ = undefined;
  }
}
