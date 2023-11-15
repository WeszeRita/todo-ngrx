import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButton } from '../../../constants/radio-button.enum';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { ButtonTitle } from '../../../constants/button-title.enum';
import { EMPTY, filter, switchMap, tap } from 'rxjs';
import { ITodo } from '../../../models/todo.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {

  buttonText = ButtonTitle.addNewTodo;
  addNewTodoForm: FormGroup;
  isEditing = true;

  protected readonly RadioButton = RadioButton;

  get newTodoTitle(): AbstractControl {
    return this.addNewTodoForm.controls['title'];
  }

  constructor(private todoFacadeService: TodoFacadeService,
              private cdr: ChangeDetectorRef,
              private destroyRef: DestroyRef,) {
  }

  ngOnInit(): void {
    this.addNewTodoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      status: new FormControl(RadioButton.ongoing, Validators.required),
    });
    this.todoFacadeService.getEditingTodoId()
      .pipe(
        switchMap((todoId: number) => {
          if (!todoId) {
            // this.isEditing = false;
            return EMPTY;
          }

          return this.todoFacadeService.getSelectedTodo(todoId)
        }),
      )
      .subscribe((selectedTodo: ITodo) => {
        this.addNewTodoForm.setValue({
        title: selectedTodo.title,
        status: selectedTodo.status
      });
    });
  }

  onSubmit(): void {
    const todo = this.addNewTodoForm.value;
    this.todoFacadeService.createNewTodo(todo);
    this.resetForm();
  }

  onCancel(): void {
    this.resetForm();
  }

  resetForm(): void {
    // this.isEditing = false;
    this.buttonText = ButtonTitle.addNewTodo;
    this.cdr.detectChanges();
    this.addNewTodoForm.reset();
    this.addNewTodoForm.setValue({
      title: null,
      status: RadioButton.ongoing,
    });
  }

}
