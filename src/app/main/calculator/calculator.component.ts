import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import {CalculatorService} from '../../common/services/calculator.service';
import {timer} from 'rxjs';

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

  sendKey(calculator) {
    calculator.loader = true;
    calculator.key = 'key';
    this.calculatorService.sendKey(calculator.id).subscribe((data) => {
      if (data === 'Success') {
        calculator.loader = false;
      }
    });
  }

  deleteCalculator(calculator) {
    calculator.loader = true;
    this.calculatorService.delete(calculator.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
        calculator.loader = false;
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
