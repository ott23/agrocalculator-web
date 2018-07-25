import {Node} from './node.model';

export class Task {
  id: number;
  node: Node;
  type: string;
  value: string;
  confirmed: boolean;
}
