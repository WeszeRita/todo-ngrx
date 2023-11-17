import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButton } from '../../../constants/radio-button.enum';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { ButtonTitle } from '../../../constants/button-title.enum';
import { EMPTY, switchMap } from 'rxjs';
import { ITodo } from '../../../models/todo.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  protected readonly RadioButton = RadioButton;
  protected readonly ButtonTitle = ButtonTitle;

  todoForm: FormGroup;
  // not used field
  buttonText = ButtonTitle.addNewTodo;
  // we can use selectedId field for checking if it's editing or not
  isEditing = false;
  selectedId: number;

  // rename to titleControl
  get newTodoTitle(): AbstractControl {
    return this.todoForm.controls['title'];
  }

  // align it
  constructor(
    private todoFacadeService: TodoFacadeService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      status: new FormControl(RadioButton.ongoing, Validators.required),
    });

    this.todoFacadeService.getEditingTodoId()
      .pipe(
        switchMap((todoId: number) => {
          if (!todoId) {
            this.isEditing = false;
            this.resetForm();
            this.cdr.detectChanges();
            return EMPTY;
          }

          return this.todoFacadeService.getSelectedTodo(todoId);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((selectedTodo: ITodo) => {
        this.isEditing = true;
        this.selectedId = selectedTodo.id;
        this.todoForm.setValue({
          title: selectedTodo.title,
          status: selectedTodo.status,
        });

        this.cdr.detectChanges();
      });
  }

  onSubmit(): void {
    if (!this.isEditing) {
      // const todo = this.todoForm.value; // we don't need the constant here
      this.todoFacadeService.createNewTodo(this.todoForm.value);
      this.resetForm(); // it repeats in both IFs, can be moved outside
      return;
    }

    if (this.isEditing) {
      const todo = {
        id: this.selectedId,
        ...this.todoForm.value,
      };
      this.todoFacadeService.editTodo(todo);
      this.todoFacadeService.selectTotoId(undefined); // ? you can also do it inside effect when you save the editing result
      this.todoFacadeService.loadTodos(); // edit it inside reducer and you will see updated todo, but not to load it again
      this.resetForm();
      return;
    }
    this.cdr.detectChanges(); // it will not be run, because both IFs have "return;"
  }

  onCancel(): void {
    this.resetForm();
    this.todoFacadeService.selectTotoId(undefined); // better to put into facade method "cancelEditing()" and you can call it there.
  }

  resetForm(): void {
    this.isEditing = false;
    this.buttonText = ButtonTitle.addNewTodo;
    this.todoForm.reset();
    this.todoForm.setValue({
      title: null,
      status: RadioButton.ongoing,
    });
  }
}
