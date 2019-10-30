import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartFarmSolutionSharedModule } from 'app/shared/shared.module';
import { PlantationComponent } from './plantation.component';
import { PlantationDetailComponent } from './plantation-detail.component';
import { PlantationUpdateComponent } from './plantation-update.component';
import { PlantationDeletePopupComponent, PlantationDeleteDialogComponent } from './plantation-delete-dialog.component';
import { plantationRoute, plantationPopupRoute } from './plantation.route';

const ENTITY_STATES = [...plantationRoute, ...plantationPopupRoute];

@NgModule({
  imports: [SmartFarmSolutionSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlantationComponent,
    PlantationDetailComponent,
    PlantationUpdateComponent,
    PlantationDeleteDialogComponent,
    PlantationDeletePopupComponent
  ],
  entryComponents: [PlantationDeleteDialogComponent]
})
export class SmartFarmSolutionPlantationModule {}
