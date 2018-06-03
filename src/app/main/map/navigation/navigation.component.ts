import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapService} from '../map.service';
import * as L from 'leaflet';
import {SharedService} from '../../../shared.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Output() showAddGeoModalEmitter = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
    this.disableMouseEvent('navigation-panel');
  }

  disableMouseEvent(elementId: string) {
    const element = <HTMLElement>document.getElementById(elementId);
    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }

  showAddGeoModal() {
    this.showAddGeoModalEmitter.emit(true);
  }

  refreshMap() {

  }

  showGeoListModal() {

  }

}
