import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit } from '@angular/core';
import { TodoFacadeService } from '../../../service';
import { ITodo } from '../../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit{
  @Input()
  todo: ITodo;

  @Input()
  editedId: number;

  selectedId: number;

  get isEditingTodo(): boolean {
    return this.selectedId === this.todo.id;
  }

  constructor(private todoFacadeService: TodoFacadeService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.todoFacadeService.getEditingTodoId()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((id: number) => {
        this.selectedId = id;
      });
  }

  toggleEdit(id: number): void {
    if (this.selectedId !== this.todo.id) {
      this.todoFacadeService.cancelEditing();
      this.selectedId = undefined;
    }

    if (this.selectedId) {
      this.todoFacadeService.cancelEditing();
    } else {
      this.todoFacadeService.selectTotoId(id);
      this.todoFacadeService.getEditingTodoId();
    }
  }

  deleteTodo(id: number): void {
    this.todoFacadeService.removeTodo(id);
    this.todoFacadeService.selectTotoId(undefined);
    this.selectedId = undefined;
  }
}
