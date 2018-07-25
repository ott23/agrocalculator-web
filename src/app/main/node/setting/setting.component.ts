import {Component, Input, OnChanges} from '@angular/core';
import {SharedService} from '../../../shared.service';
import {NodeService} from '../../../common/services/node.service';
import {Node} from '../../../common/models/node.model';
import {SettingService} from '../../../common/services/setting.service';
import {Setting} from '../../../common/models/setting.model';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnChanges {

  @Input() node: Node;
  nodeSettingList = [];
  editedSettingId = null;

  constructor(private calculatorService: NodeService, private settingService: SettingService, private sharedService: SharedService) {
  }

  ngOnChanges() {
    this.refreshList();
  }

  refreshList() {
    if (this.node.id != null) {
      this.settingService.getAllByNodeId(this.node.id).subscribe(
        (data) => {
          this.nodeSettingList = data;
          this.sharedService.emitLoader(false);
        }
      );
    }
  }

  setEditedId(id: number) {
    this.editedSettingId = id;
  }

  setSetting(setting: Setting, value: string) {
    setting.value = value;
    setting.node = this.node;
    this.setEditedId(null);
    this.sharedService.emitLoader(true);
    this.settingService.setSettingForNode(setting).subscribe(() => {
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
