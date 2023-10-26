import { RadioButton } from '../constants/radioButton.enum';

export interface ITodo {
  id: number;
  title: string;
  // single quotes, optimizing it
  status: `${RadioButton}`;
}
