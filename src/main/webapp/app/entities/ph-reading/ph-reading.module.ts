import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartFarmSolutionSharedModule } from 'app/shared/shared.module';
import { PhReadingComponent } from './ph-reading.component';
import { PhReadingDetailComponent } from './ph-reading-detail.component';
import { PhReadingUpdateComponent } from './ph-reading-update.component';
import { PhReadingDeletePopupComponent, PhReadingDeleteDialogComponent } from './ph-reading-delete-dialog.component';
import { phReadingRoute, phReadingPopupRoute } from './ph-reading.route';

const ENTITY_STATES = [...phReadingRoute, ...phReadingPopupRoute];

@NgModule({
  imports: [SmartFarmSolutionSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PhReadingComponent,
    PhReadingDetailComponent,
    PhReadingUpdateComponent,
    PhReadingDeleteDialogComponent,
    PhReadingDeletePopupComponent
  ],
  entryComponents: [PhReadingDeleteDialogComponent]
})
export class SmartFarmSolutionPhReadingModule {}
