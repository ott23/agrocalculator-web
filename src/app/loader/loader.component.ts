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
        state(
          '*',
          style({
            opacity: 1
          })
        ),
        transition(
          'void => * , * => void',
          [
            animate('100ms ease-in-out')
          ]
        )
      ]
    )
  ]
})
export class LoaderComponent {

  @Input() visible: boolean;
  @Input() centred: boolean;

  constructor() {
  }

}
