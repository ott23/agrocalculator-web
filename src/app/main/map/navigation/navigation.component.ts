import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Output() navigationEmitter = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
    this.disableMouseEvent('navigation');
  }

  disableMouseEvent(elementId: string) {
    const element = <HTMLElement>document.getElementById(elementId);
    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }

  showAddGeometryModal() {
    this.navigationEmitter.emit('showAddGeometryModal');
  }

  showGeometryListModal() {
    this.navigationEmitter.emit('showGeometryListModal');
  }

  refreshMap() {
    this.navigationEmitter.emit('refreshMap');
  }

  fitBounds() {
    this.navigationEmitter.emit('fitBounds');
  }

  showClient() {
    this.navigationEmitter.emit('showClient');
  }

}
