import { status } from '../constants';

export interface ITodo {
  id: number;
  title: string;
  status: `${ status }`;
}
