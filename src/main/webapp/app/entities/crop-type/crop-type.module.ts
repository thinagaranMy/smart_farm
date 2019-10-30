import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartFarmSolutionSharedModule } from 'app/shared/shared.module';
import { CropTypeComponent } from './crop-type.component';
import { CropTypeDetailComponent } from './crop-type-detail.component';
import { CropTypeUpdateComponent } from './crop-type-update.component';
import { CropTypeDeletePopupComponent, CropTypeDeleteDialogComponent } from './crop-type-delete-dialog.component';
import { cropTypeRoute, cropTypePopupRoute } from './crop-type.route';

const ENTITY_STATES = [...cropTypeRoute, ...cropTypePopupRoute];

@NgModule({
  imports: [SmartFarmSolutionSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CropTypeComponent,
    CropTypeDetailComponent,
    CropTypeUpdateComponent,
    CropTypeDeleteDialogComponent,
    CropTypeDeletePopupComponent
  ],
  entryComponents: [CropTypeDeleteDialogComponent]
})
export class SmartFarmSolutionCropTypeModule {}
