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

  calculatorList = [];

  constructor(private calculatorService: CalculatorService, private sharedService: SharedService, private zone: NgZone) {
    this.sharedService.emitLoaderStatus(false);
  }

  ngOnInit() {
    this.sharedService.emitLoaderStatus(true);
    this.refreshList();
    this.sharedService.emitLoaderStatus(false);
    timer(2000, 10000).subscribe(() => this.refreshList());
  }

  refreshList() {
    this.calculatorService.getAll().subscribe(
      (data) => {
        this.zone.run(() => {
          this.calculatorList = data;
          this.sharedService.emitLoaderStatus(false);
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

}
