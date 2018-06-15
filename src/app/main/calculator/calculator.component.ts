import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import {CalculatorService} from './calculator.service';
import {timer} from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  isStatusModalVisible = false;

  calculatorList = [];

  calculator = null;

  constructor(private calculatorService: CalculatorService, private sharedService: SharedService, private zone: NgZone) {
    this.sharedService.emitLoader(true);
    this.sharedService.statusModalVisibleSubjectObservable.subscribe(
      (statusModalVisibleStatus) => this.isStatusModalVisible = statusModalVisibleStatus
    );
  }

  ngOnInit() {
    this.sharedService.emitLoader(true);
    this.refreshList();
    timer(10000, 10000).subscribe(() => this.refreshList());
  }

  toggleStatusModal() {
    this.sharedService.emitCalculator(this.calculator);
    this.sharedService.emitStatusModalVisible();
  }

  refreshList() {
    this.calculatorService.getAll().subscribe(
      (data) => {
        this.zone.run(() => {
          this.calculatorList = data;
          this.sharedService.emitLoader(false);
        });
      }
    );
  }

  sendKey(calculator) {
    this.calculatorService.sendKey(calculator.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  status(calculator) {
    this.calculator = calculator;
    this.toggleStatusModal();
  }

}
