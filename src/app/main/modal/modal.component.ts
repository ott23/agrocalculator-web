import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalWindowTrigger', [
      transition('void => *', [
        style({
          transform: 'translate(-50%, -50%) scale3d(.3, .3, .3)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200),
        style({transform: 'scale3d(.0, .0, .0)'})
      ])
    ]),
    trigger('modalBackgroundTrigger', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 0.6})),
      transition('void <=> *', animate(100))
    ])
  ]
})

export class ModalComponent implements OnInit {

  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
