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

  // this observable is not used here
  selectedId$: Observable<number>;
  isEditing = false;

  get isEditingTodo(): boolean {
    // notes: we have isEditing flag already here, why not to use it?
    return this.editedId === this.todo.id;
  }

  constructor(private todoFacadeService: TodoFacadeService) {}

  toggleEdit(id: number): void {
    // refactor the code
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

  // we can simplify - deleteTodo() {...}
  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
    this.todoFacadeService.selectTotoId(undefined);
    this.selectedId$ = undefined;
  }
}
