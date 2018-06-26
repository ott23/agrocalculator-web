import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import {CalculatorService} from '../../common/services/calculator.service';
import {timer} from 'rxjs';
import {Calculator} from '../../common/models/calculator.model';

@Component({
  selector: 'app-client',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {

  isStatusModalVisible = false;
  isSettingModalVisible = false;
  calculatorList = [];
  timer;

  constructor(private calculatorService: CalculatorService, private sharedService: SharedService) {
    this.sharedService.emitLoader(true);
    this.sharedService.statusModalVisibleObservable.subscribe(
      (data) => this.isStatusModalVisible = data
    );
    this.sharedService.settingModalVisibleObservable.subscribe(
      (data) => this.isSettingModalVisible = data
    );
  }

  ngOnInit() {
    this.sharedService.emitLoader(true);
    this.refreshList();
    this.timer = timer(2000, 2000).subscribe(() => this.refreshList());
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  toggleStatusModal() {
    this.sharedService.emitStatusModalVisible();
  }

  toggleSettingModal() {
    this.sharedService.emitSettingModalVisible();
  }

  refreshList() {
    this.calculatorService.getAll().subscribe(
      (data) => {
        this.calculatorList = data;
        this.sharedService.emitLoader(false);
      }
    );
  }

  trackBySettings(index: number, calculator: Calculator): number {
    return calculator.id;
  }

  filterTaskByTypeIsKey(task) {
    return (task.type === 'key');
  }

  sendKey(calculator) {
    this.calculatorService.sendKey(calculator.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  switch(calculator) {
    this.calculatorService.switch(calculator.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  shutdown(calculator) {
    this.calculatorService.shutdown(calculator.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  kill(calculator) {
    this.calculatorService.kill(calculator.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  delete(calculator) {
    this.calculatorService.delete(calculator.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  setting(calculator) {
    this.sharedService.emitLoader(true);
    this.sharedService.emitCalculator([calculator, 'setting']);
  }

  status(calculator) {
    this.sharedService.emitLoader(true);
    this.sharedService.emitCalculator([calculator, 'status']);
  }


}
