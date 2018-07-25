import {Task} from './task.model';

export class Node {
  id: number;
  type: string;
  address: string;
  name: string;
  code: string;
  key: string;
  status: boolean;
  connection: boolean;
  archive: boolean;
  tasks: Task[];
}
