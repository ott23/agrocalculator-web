import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import {Subscription, timer} from 'rxjs';
import {Unit} from '../../common/models/unit.model';
import {UnitService} from '../../common/services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit, OnDestroy {

  isUnitModalVisible = false;
  unitList: Unit[] = [];
  unit: Unit = new Unit();
  timer: Subscription;

  constructor(private unitService: UnitService, private sharedService: SharedService) {
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

  track(index: number, unit: Unit): string {
    return unit.id;
  }

  closeUnitModal() {
    this.toggleUnitModal();
    this.refreshList();
  }

  toggleUnitModal() {
    this.isUnitModalVisible = !this.isUnitModalVisible;
  }

  refreshList() {
    this.unitService.getAll().subscribe(
      (data) => {
        this.unitList = data;
        this.sharedService.emitLoader(false);
      }
    );
  }

  add() {
    this.unit = new Unit();
    this.toggleUnitModal();
  }

  edit(unit) {
    this.unit = unit;
    this.toggleUnitModal();
  }

  delete(unit) {
    this.sharedService.emitLoader(true);
    this.unitService.delete(unit.id).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

}
