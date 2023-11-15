import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { ITodo } from '../../../models/todo.model';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input()
  todo: ITodo;

  selectedId$: Observable<number>;
  isEditing = false;

  constructor(private todoFacadeService: TodoFacadeService) {
  }

  toggleEdit(id: number): void {
    if (this.selectedId$) {
      // console.log('editing is finished')
      this.isEditing = false;
      this.todoFacadeService.selectTotoId(undefined);
      this.selectedId$ = undefined;
      // console.log('selected id (should be undef.)', this.selectedId$)
      return
    }
    if (!this.selectedId$){
      // console.log('user can edit the todo')
      this.isEditing = true;
      this.todoFacadeService.selectTotoId(id);
      this.selectedId$ = this.todoFacadeService.getEditingTodoId();
      // console.log('selected id in isEditing mode', this.selectedId$)
      return;
    }

  }

  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
    this.todoFacadeService.selectTotoId(undefined);
    this.selectedId$ = undefined;
  }
}
