import { Component } from '@angular/core';
import {fadeAnimationTrigger} from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeAnimationTrigger
  ]
})
export class AppComponent {
}
