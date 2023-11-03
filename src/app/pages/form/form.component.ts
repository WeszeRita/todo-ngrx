import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButton} from '../../../constants/radio-button.enum';
import { TodoFacadeService } from '../../../service/todo-facade.service';
import { ITodo } from '../../../models/todo.model';
import { ButtonTitle } from '../../../constants/button-title.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnChanges {
  protected readonly RadioButton = RadioButton;

  addNewTodoForm: FormGroup;
  isEditing = false;
  buttonText = ButtonTitle.addNewTodo;

  @Input()
  selectedTodo: ITodo;

  get newTodoTitle(): AbstractControl {
    return this.addNewTodoForm.controls['title'];
  }

  constructor(private todoFacadeService: TodoFacadeService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.selectedTodo) {
      return;
    }

    this.isEditing = true;
    this.buttonText = ButtonTitle.isEditing;

    if (changes['selectedTodo']) {
      this.addNewTodoForm.setValue({
        title: this.selectedTodo.title,
        status: this.selectedTodo.status,
      });
    }
  }

  ngOnInit(): void {
    this.addNewTodoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      status: new FormControl(RadioButton.ongoing, Validators.required),
    })
  }

  onSubmit() {
    if (!this.isEditing) {
      const todo = this.addNewTodoForm.value;
      this.todoFacadeService.createNewTodo(todo);
    }

    if (this.isEditing) {
      const todo = {
        id: this.selectedTodo.id,
        ...this.addNewTodoForm.value
      };

      this.todoFacadeService.editTodo(todo);
      this.todoFacadeService.initTodos();
      this.isEditing = false;
      this.addNewTodoForm.reset();
    }

    this.isEditing = false;
    this.addNewTodoForm.reset();
    this.addNewTodoForm.setValue({
      title: null,
      status: RadioButton.ongoing,
    })
  }

  onCancel(): void {
    this.isEditing = false;
    this.addNewTodoForm.reset();
    this.addNewTodoForm.setValue({
      title: null,
      status: RadioButton.ongoing,
    })
  }
}
