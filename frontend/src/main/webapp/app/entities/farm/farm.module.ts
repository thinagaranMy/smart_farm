import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmarfarmSharedModule } from 'app/shared/shared.module';
import { FarmComponent } from './farm.component';
import { FarmDetailComponent } from './farm-detail.component';
import { FarmUpdateComponent } from './farm-update.component';
import { FarmDeletePopupComponent, FarmDeleteDialogComponent } from './farm-delete-dialog.component';
import { farmRoute, farmPopupRoute } from './farm.route';

const ENTITY_STATES = [...farmRoute, ...farmPopupRoute];

@NgModule({
  imports: [SmarfarmSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [FarmComponent, FarmDetailComponent, FarmUpdateComponent, FarmDeleteDialogComponent, FarmDeletePopupComponent],
  entryComponents: [FarmDeleteDialogComponent]
})
export class SmarfarmFarmModule {}
