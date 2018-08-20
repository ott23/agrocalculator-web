import {Component, OnDestroy, OnInit} from '@angular/core';
import {Geozone} from '../../common/models/geozone.model';
import {Subscription, timer} from 'rxjs';
import {GeozoneService} from '../../common/services/geozone.service';
import {SharedService} from '../../shared.service';

@Component({
  selector: 'app-geozone',
  templateUrl: './geozone.component.html',
  styleUrls: ['./geozone.component.scss']
})
export class GeozoneComponent implements OnInit, OnDestroy {

  isGeozoneModalVisible = false;
  geozoneList: Geozone[] = [];
  geozone: Geozone = new Geozone();
  timer: Subscription;

  constructor(private geozoneService: GeozoneService, private sharedService: SharedService) {
    this.sharedService.emitLoader(true);
  }

  ngOnInit() {
    this.sharedService.emitLoader(true);
    this.refreshList();
    this.timer = timer(2000, 2000).subscribe(() => this.refreshList());
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  track(index: number, geozone: Geozone): string {
    return geozone.id;
  }

  closeGeozoneModal() {
    this.toggleGeozoneModal();
    this.refreshList();
  }

  toggleGeozoneModal() {
    this.isGeozoneModalVisible = !this.isGeozoneModalVisible;
  }

  refreshList() {
    this.geozoneService.getAll().subscribe(
      (data) => {
        this.geozoneList = data;
        this.sharedService.emitLoader(false);
      }
    );
  }

  add() {
    this.geozone = new Geozone();
    this.toggleGeozoneModal();
  }

  edit(geozone) {
    this.geozone = geozone;
    this.toggleGeozoneModal();
  }

  delete(geozone) {
    this.sharedService.emitLoader(true);
    this.geozoneService.delete(geozone.id).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }
}
