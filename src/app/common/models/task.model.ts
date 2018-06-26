import {Calculator} from './calculator.model';

export class Task {
  id: number;
  calculator: Calculator;
  type: string;
  value: string;
  confirmed: boolean;
}
