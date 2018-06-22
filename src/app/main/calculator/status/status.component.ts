import {Component} from '@angular/core';
import {CalculatorService} from '../../../common/services/calculator.service';
import {SharedService} from '../../../shared.service';
import {Calculator} from '../../../common/models/calculator.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  calculator: Calculator;

  calculatorStatusList = [];

  constructor(private calculatorService: CalculatorService, private sharedService: SharedService) {
    this.sharedService.calculatorObservable.subscribe(
      (data) => {
        if(data[1] === 'status') {
          this.calculator = data[0];
          this.calculatorStatusList = [];
          this.refreshList();
        }
      }
    );
  }

  refreshList() {
    this.calculatorService.getStatusesByCalculatorId(this.calculator.id).subscribe(
      (data) => {
        this.calculatorStatusList = data;
        this.sharedService.emitLoader(false);
        if (!this.sharedService.isStatusModalVisible) {
          this.sharedService.emitStatusModalVisible();
        }
      }
    );
  }

}
