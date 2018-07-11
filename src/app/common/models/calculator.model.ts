import {Task} from './task.model';

export class Calculator {
  id: number;
  address: string;
  name: string;
  code: string;
  key: string;
  status: boolean;
  connection: boolean;
  archive: boolean;
  tasks: Task[];
}
