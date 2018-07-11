import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-in-table',
  templateUrl: './edit-in-table.component.html',
  styleUrls: ['./edit-in-table.component.scss']
})
export class EditInTableComponent implements OnInit {

  @Input() item: String;
  @Output() itemEmitter = new EventEmitter<any>();
  @Output() closeEmitter = new EventEmitter<boolean>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      value: [this.item]
    });
  }

  send() {
    const val = this.form.value;
    if (!this.form.valid) {
      alert('Введены некорректные данные');
      return;
    }
    this.item = val.value;
    this.itemEmitter.emit(this.item);
  }

  close() {
    this.closeEmitter.emit(true);
  }

}
