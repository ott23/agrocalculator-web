import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const transitionAnimationTrigger = trigger('transitionAnimationTrigger', [
  transition('* => *', [
    query(':enter, :leave', style({position: 'fixed', width: '100%', height: '100%'})
      , {optional: true}),
    group([
      query(':enter', [
        style({transform: 'translateX(200%)'}),
        animate('0.7s ease-in-out', style({transform: 'translateX(0%)'}))
      ], {optional: true}),
      query(':leave', [
        style({opacity: '1'}),
        animate('0.2s ease-in-out', style({opacity: '0'}))
      ], {optional: true}),
    ])
  ])
]);


