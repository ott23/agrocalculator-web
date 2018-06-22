import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  animations: [
    trigger(
      'loaderTrigger',
      [
        state('void', style({opacity: 0})),
        state('*', style({opacity: 1})),
        transition('void <=> *', animate(50))
      ]
    )
  ]
})
export class LoaderComponent {

  @Input() visible: boolean;
  @Input() gray: boolean;
  @Input() center: boolean;
  @Input() small: boolean;

  constructor() {
  }

}
