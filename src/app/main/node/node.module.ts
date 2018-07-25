import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NodeComponent} from './node.component';
import {NodeService} from '../../common/services/node.service';
import {SharedService} from '../../shared.service';
import {StatusComponent} from './status/status.component';
import {ModalModule} from '../../common/components/modal/modal.module';
import {LoaderModule} from '../../common/components/loader/loader.module';
import {SettingComponent} from './setting/setting.component';
import {SettingService} from '../../common/services/setting.service';
import {EditInTableModule} from '../../common/components/edit-in-table/edit-in-table.module';

@NgModule({
  imports: [
    CommonModule,
    LoaderModule,
    ModalModule,
    EditInTableModule
  ],
  declarations: [NodeComponent, StatusComponent, SettingComponent],
  providers: [
    NodeService,
    SettingService,
    SharedService
  ]
})
export class NodeModule { }
