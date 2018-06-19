import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import {CalculatorService} from './calculator.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {

  isStatusModalVisible = false;
  calculatorList = [];
  calculator = null;
  timer;

  constructor(private calculatorService: CalculatorService, private sharedService: SharedService) {
    this.sharedService.emitLoader(true);
    this.sharedService.statusModalVisibleSubjectObservable.subscribe(
      (statusModalVisibleStatus) => this.isStatusModalVisible = statusModalVisibleStatus
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

  status(calculator) {
    this.calculator = calculator;
    this.sharedService.emitLoader(true);
    this.sharedService.emitCalculator(this.calculator);
  }

}
