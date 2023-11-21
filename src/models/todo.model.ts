import { Status } from '../constants';

export interface ITodo {
  id: number;
  title: string;
  status: `${ Status }`;
}
