import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalWindowTrigger', [
      state('void', style({transform: 'translate(-50%, -50%) scale3d(0, 0, 0)'})),
      state('*', style({transform: 'translate(-50%, -50%) scale3d(1, 1, 1)'})),
      transition('void <=> *', animate(200))
    ]),
    trigger('modalBackgroundTrigger', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 0.6})),
      transition('void <=> *', animate(200))
    ])
  ]
})

export class ModalComponent {

  @Input() title: string;
  @Input() visible: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
