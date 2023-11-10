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

  selectedId$;

  constructor(private todoFacadeService: TodoFacadeService) {
  }

  toggleEdit(id: number): void {
    if (this.selectedId$) {
      console.log('editing is finished')
      this.todoFacadeService.selectTotoId(undefined);
      this.selectedId$ = this.todoFacadeService.selectTotoId(undefined);         // Todo!!!
      console.log('selected id', this.selectedId$)
      return
    }
    if (!this.selectedId$){
      console.log('user can edit the todo')
      this.todoFacadeService.selectTotoId(id);
      this.selectedId$ = this.todoFacadeService.getEditingTodoId();
      console.log(this.selectedId$)
      return;
    }

  }

  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);    //Todo: check the editingId, too
  }
}
