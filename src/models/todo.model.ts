// Add index.ts in constants folder
import { RadioButton } from '../constants/radio-button.enum';

export interface ITodo {
  id: number;
  title: string;
  status: `${ RadioButton }`;
}
