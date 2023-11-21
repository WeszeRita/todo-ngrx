import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { status } from '../../../constants';
import { TodoFacadeService } from '../../../service';
import { EMPTY, switchMap } from 'rxjs';
import { ITodo } from '../../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  todoForm: FormGroup;
  selectedId: number;
  readonly todoStatuses = Object.keys(status);

  get titleControl(): AbstractControl {
    return this.todoForm.controls['title'];
  }

  constructor(
    private todoFacadeService: TodoFacadeService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });

    this.todoFacadeService.getEditingTodoId()
      .pipe(
        switchMap((todoId: number) => {
          if (!todoId) {
            this.resetForm();
            this.cdr.detectChanges();
            return EMPTY;
          }

          return this.todoFacadeService.getSelectedTodo(todoId);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((selectedTodo: ITodo) => {
        this.selectedId = selectedTodo.id;
        this.todoForm.setValue({
          title: selectedTodo.title,
          status: selectedTodo.status,
        });

        this.cdr.detectChanges();
      });
  }

  onSubmit(): void {
    if (!this.selectedId) {
      this.todoFacadeService.createNewTodo(this.todoForm.value);
    } else {
      const todo = {
        id: this.selectedId,
        ...this.todoForm.value,
      };
      this.todoFacadeService.editTodo(todo);
      this.todoFacadeService.cancelEditing();
      this.selectedId = undefined;
    }

    this.resetForm();
  }

  onCancel(): void {
    this.resetForm();
    this.todoFacadeService.cancelEditing();
  }

  resetForm(): void {
    this.todoForm.reset();
    this.todoForm.setValue({
      title: null,
      status: null,
    });
    this.cdr.detectChanges();
  }
}
