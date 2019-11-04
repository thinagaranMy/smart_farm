import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmarfarmSharedModule } from 'app/shared/shared.module';
import { AreaComponent } from './area.component';
import { AreaDetailComponent } from './area-detail.component';
import { AreaUpdateComponent } from './area-update.component';
import { AreaDeletePopupComponent, AreaDeleteDialogComponent } from './area-delete-dialog.component';
import { areaRoute, areaPopupRoute } from './area.route';

const ENTITY_STATES = [...areaRoute, ...areaPopupRoute];

@NgModule({
  imports: [SmarfarmSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [AreaComponent, AreaDetailComponent, AreaUpdateComponent, AreaDeleteDialogComponent, AreaDeletePopupComponent],
  entryComponents: [AreaDeleteDialogComponent]
})
export class SmarfarmAreaModule {}
