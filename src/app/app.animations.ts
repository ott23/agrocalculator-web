import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const fadeAnimationTrigger = trigger('fadeAnimationTrigger', [
  transition('* => *', [
    query(':enter, :leave', style({position: 'fixed', width: '100%', height: '100%'})
      , {optional: true}),
    group([
      query(':enter', [
        style({opacity: '0'}),
        animate('0.5s ease-in-out', style({opacity: '1'}))
      ], {optional: true}),
      query(':leave', [
        style({opacity: '1'}),
        animate('0.3s ease-in-out', style({opacity: '0'}))
      ], {optional: true}),
    ])
  ])
]);


