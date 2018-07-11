import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import {CalculatorService} from '../../common/services/calculator.service';
import {Observable, of, timer} from 'rxjs';
import {Calculator} from '../../common/models/calculator.model';
import {Setting} from '../../common/models/setting.model';
import {catchError, map} from 'rxjs/operators';
import {User} from '../../common/models/user.model';

@Component({
  selector: 'app-client',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, OnDestroy {

  isStatusModalVisible = false;
  isSettingModalVisible = false;
  calculatorList = [];
  editedCalculatorId = null;
  timer;

  constructor(private calculatorService: CalculatorService, private sharedService: SharedService) {
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

  toggleStatusModal() {
    this.isStatusModalVisible = !this.isStatusModalVisible;
  }

  toggleSettingModal() {
    this.isSettingModalVisible = !this.isSettingModalVisible;
  }

  refreshList() {
    this.calculatorService.getAll().subscribe(
      (data) => {
        this.calculatorList = data;
        this.sharedService.emitLoader(false);
      }
    );
  }

  track(index: number, calculator: Calculator): number {
    return calculator.id;
  }

  filterTaskByTypeIsKey(task) {
    return (task.type === 'key');
  }

  setEditedId(id: number) {
    this.editedCalculatorId = id;
  }

  setEditedName(calculator: Calculator, name: string) {
    this.isCalculatorExistingByName(calculator, name).subscribe((isCalculatorExisting) => {
      if (isCalculatorExisting) {
        alert('Калькулятор с таким именем уже существует');
        return;
      }
      calculator.name = name;
      this.setEditedId(null);
      this.sharedService.emitLoader(true);
      this.calculatorService.setEditedValue(calculator).subscribe(() => {
        this.refreshList();
        this.sharedService.emitLoader(false);
      });
    });
  }

  isCalculatorExistingByName(calculator: Calculator, name: string): Observable<boolean> {
    return this.calculatorService.getAllByName(name).pipe(
      map((calculators: Calculator[]) => {
        return calculators.filter(c => c.code !== calculator.code).length !== 0;
      }),
      catchError(() => of(false))
    );
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
