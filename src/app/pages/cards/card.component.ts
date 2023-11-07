import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnChanges,
  Output,
} from '@angular/core';
import { ITodo } from '../../../models/todo.model';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { RadioButton } from '../../../constants/radio-button.enum';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnChanges {
  @Output()
  selectedTodo = new EventEmitter<ITodo>();

  @Output()
  cancelOnCard = new EventEmitter<boolean>();

  @Input()
  isEditing: boolean;

  @Input()
  todo: ITodo;

  @Input()
  isCancelled: boolean;

  constructor(private todoFacadeService: TodoFacadeService) {
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.selectedTodo.emit(
        {
          title: '',
          status: RadioButton.ongoing,
          id: null,
        }
      );
      this.isEditing = false;
      this.cancelOnCard.emit();
      return;
    }

    if (!this.isEditing) {
      this.selectedTodo.emit(this.todo);
      this.isEditing = true;
      return;
    }
  }

  onDeleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
  }

  ngOnChanges() {
    this.isEditing = false;
  }
}
