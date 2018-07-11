import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Geometry} from '../models/geometry.model';

@Component({
  selector: 'app-geometry-list',
  templateUrl: './geometry-list.component.html',
  styleUrls: ['./geometry-list.component.scss']
})
export class GeometryListComponent implements OnInit {

  @Input() geometryList: Geometry[];
  @Output() geometryListEmitter = new EventEmitter<[string, number]>();

  constructor() {
  }

  ngOnInit() {
  }

  toggleGeometry(id: number) {
    this.geometryListEmitter.emit(['toggle', id]);
  }

  removeGeometry(id: number) {
    this.geometryListEmitter.emit(['remove', id]);
  }

}
