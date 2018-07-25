import {Component, Input, OnChanges} from '@angular/core';
import {NodeService} from '../../../common/services/node.service';
import {SharedService} from '../../../shared.service';
import {Node} from '../../../common/models/node.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnChanges {

  @Input() node: Node;
  nodeStatusList = [];

  constructor(private calculatorService: NodeService, private sharedService: SharedService) {
  }

  ngOnChanges() {
    this.refreshList();
  }

  refreshList() {
    if (this.node.id != null) {
      this.calculatorService.getStatusesByNodeId(this.node.id).subscribe(
        (data) => {
          this.nodeStatusList = data;
          this.sharedService.emitLoader(false);
        }
      );
    }
  }

}
