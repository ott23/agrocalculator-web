import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import {Observable, Subscription, timer} from 'rxjs';
import {Client} from '../../common/models/client.model';
import {ClientService} from '../../common/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  isClientModalVisible = false;
  unitList: Client[] = [];
  client: Client = new Client();
  timer: Subscription;

  constructor(private clientService: ClientService, private sharedService: SharedService) {
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

  track(index: number, client: Client): string {
    return client.id;
  }

  closeClientModal() {
    this.toggleClientModal();
    this.refreshList();
  }

  toggleClientModal() {
    this.isClientModalVisible = !this.isClientModalVisible;
  }

  refreshList() {
    this.clientService.getAll().subscribe(
      (data) => {
        this.unitList = data;
        this.sharedService.emitLoader(false);
      }
    );
  }

  add() {
    this.client = new Client();
    this.toggleClientModal();
  }

  edit(client) {
    this.client = client;
    this.toggleClientModal();
  }

  delete(client) {
    this.sharedService.emitLoader(true);
    this.clientService.delete(client.id).subscribe(() => {
      this.refreshList();
      this.sharedService.emitLoader(false);
    });
  }

}
