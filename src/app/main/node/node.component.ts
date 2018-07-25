import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../shared.service';
import {NodeService} from '../../common/services/node.service';
import {Observable, of, timer} from 'rxjs';
import {Node} from '../../common/models/node.model';
import {Setting} from '../../common/models/setting.model';
import {catchError, map} from 'rxjs/operators';
import {User} from '../../common/models/user.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit, OnDestroy {

  isStatusModalVisible = false;
  isSettingModalVisible = false;
  nodeList: Node[] = [];
  node: Node = new Node();
  editedNodeId = null;
  timer;

  constructor(private nodeService: NodeService, private sharedService: SharedService) {
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
    this.nodeService.getAll().subscribe(
      (data) => {
        this.nodeList = data;
        this.sharedService.emitLoader(false);
      }
    );
  }

  track(index: number, node: Node): number {
    return node.id;
  }

  filterTaskByTypeIsKey(task) {
    return (task.type === 'key');
  }

  setEditedId(id: number) {
    this.editedNodeId = id;
  }

  setEditedName(node: Node, name: string) {
    this.isNodeExistingByName(node, name).subscribe((isNodeExisting) => {
      if (isNodeExisting) {
        alert('Калькулятор с таким именем уже существует');
        return;
      }
      node.name = name;
      this.setEditedId(null);
      this.sharedService.emitLoader(true);
      this.nodeService.setEditedValue(node).subscribe(() => {
        this.refreshList();
        this.sharedService.emitLoader(false);
      });
    });
  }

  isNodeExistingByName(node: Node, name: string): Observable<boolean> {
    return this.nodeService.getAllByName(name).pipe(
      map((nodes: Node[]) => {
        return nodes.filter(c => c.code !== node.code).length !== 0;
      }),
      catchError(() => of(false))
    );
  }

  sendKey(node) {
    this.nodeService.sendKey(node.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  switch(node) {
    this.nodeService.switch(node.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  shutdown(node) {
    this.nodeService.shutdown(node.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  kill(node) {
    this.nodeService.kill(node.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  delete(node) {
    this.nodeService.delete(node.id).subscribe((data) => {
      if (data === 'Success') {
        this.refreshList();
      }
    });
  }

  setting(node) {
    this.sharedService.emitLoader(true);
    this.node = node;
    this.toggleSettingModal();
  }

  status(node) {
    this.sharedService.emitLoader(true);
    this.node = node;
    this.toggleStatusModal();
  }


}
