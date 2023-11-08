import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButton } from '../../../constants/radio-button.enum';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { ButtonTitle } from '../../../constants/button-title.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {

  buttonText = ButtonTitle.addNewTodo;
  addNewTodoForm: FormGroup;
  isEditing = false;

  protected readonly RadioButton = RadioButton;

  get newTodoTitle(): AbstractControl {
    return this.addNewTodoForm.controls['title'];
  }

  constructor(private todoFacadeService: TodoFacadeService, private cdr: ChangeDetectorRef) {
  }



  ngOnInit(): void {
    this.addNewTodoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      status: new FormControl(RadioButton.ongoing, Validators.required),
    });
  }

  onSubmit(): void {
    const todo = this.addNewTodoForm.value;
    this.todoFacadeService.createNewTodo(todo);
    this.resetForm();
  }

  onCancel(): void {
  }

  resetForm(): void {
    this.isEditing = false;
    this.buttonText = ButtonTitle.addNewTodo;
    this.cdr.detectChanges();
    this.addNewTodoForm.reset();
    this.addNewTodoForm.setValue({
      title: null,
      status: RadioButton.ongoing,
    });
  }

}
