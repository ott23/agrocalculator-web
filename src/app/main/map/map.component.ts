import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() loaderStatusChanged = new EventEmitter<boolean>();

  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.sharedService.emitLoaderStatus(false);
  }

}
