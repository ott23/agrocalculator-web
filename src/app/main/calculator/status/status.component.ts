import {Component} from '@angular/core';
import {CalculatorService} from '../calculator.service';
import {SharedService} from '../../../shared.service';
import {Calculator} from '../calculator.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  calculator: Calculator;

  calculatorStatusList = [];

  constructor(private calculatorService: CalculatorService, private sharedService: SharedService) {
    this.sharedService.calculatorSubjectObservable.subscribe(
      (calculator) => {
        this.calculator = calculator;
        this.calculatorStatusList = [];
        this.refreshList();
      }
    );
  }

  refreshList() {
    this.calculatorService.getStatuses(this.calculator.id).subscribe(
      (data) => {
        this.calculatorStatusList = data;
        this.sharedService.emitLoader(false);
        this.sharedService.emitStatusModalVisible();
      }
    );
  }

}
