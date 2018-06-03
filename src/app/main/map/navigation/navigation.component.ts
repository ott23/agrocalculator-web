import {Component, OnInit} from '@angular/core';
import {MapService} from '../map.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.disableMouseEvent('navigation-panel');
  }

  disableMouseEvent(elementId: string) {
    const element = <HTMLElement>document.getElementById(elementId);
    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }

}
