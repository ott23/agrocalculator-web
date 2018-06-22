import {Component} from '@angular/core';
import {SharedService} from '../../../shared.service';
import {CalculatorService} from '../../../common/services/calculator.service';
import {Calculator} from '../../../common/models/calculator.model';
import {SettingService} from '../../../common/services/setting.service';
import {Setting} from '../../../common/models/setting.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {

  calculator: Calculator;
  calculatorSettingList = [];
  editedSettingId = null;

  constructor(private calculatorService: CalculatorService, private settingService: SettingService, private sharedService: SharedService) {
    this.sharedService.calculatorObservable.subscribe(
      (data) => {
        if (data[1] === 'setting') {
          this.calculator = data[0];
          this.calculatorSettingList = [];
          this.refreshList();
        }
      }
    );
  }

  refreshList() {
    this.settingService.getAllByCalculatorId(this.calculator.id).subscribe(
      (data) => {
        this.calculatorSettingList = data;
        this.sharedService.emitLoader(false);
        if (!this.sharedService.isSettingModalVisible) {
          this.sharedService.emitSettingModalVisible();
        }
      }
    );
  }

  setEdited(id: number) {
    this.editedSettingId = id;
  }

  setSetting(setting: Setting, value: string) {
    setting.value = value;
    setting.calculator = this.calculator;
    this.setEdited(null);
    this.sharedService.emitLoader(true);
    this.settingService.setSettingForCalculator(setting).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

  deleteSetting(id: number) {
    this.sharedService.emitLoader(true);
    this.settingService.deleteSetting(id).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

}
