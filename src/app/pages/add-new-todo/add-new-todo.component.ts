import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButton} from '../../../constants/radioButton.enum';

@Component({
  selector: 'app-add-new-todo',
  templateUrl: './add-new-todo.component.html',
  styleUrls: ['./add-new-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewTodoComponent  implements OnInit {
  addNewTodoForm!: FormGroup;
  isNewTodoSavedMessage = false;
  readonly radioButton = RadioButton;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.addNewTodoForm = new FormGroup({
      newTodo: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {

  }

  protected readonly RadioButton = RadioButton;
}
