import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmarfarmSharedModule } from 'app/shared/shared.module';
import { WaterConsumptionComponent } from './water-consumption.component';
import { WaterConsumptionDetailComponent } from './water-consumption-detail.component';
import { WaterConsumptionUpdateComponent } from './water-consumption-update.component';
import { WaterConsumptionDeletePopupComponent, WaterConsumptionDeleteDialogComponent } from './water-consumption-delete-dialog.component';
import { waterConsumptionRoute, waterConsumptionPopupRoute } from './water-consumption.route';

const ENTITY_STATES = [...waterConsumptionRoute, ...waterConsumptionPopupRoute];

@NgModule({
  imports: [SmarfarmSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    WaterConsumptionComponent,
    WaterConsumptionDetailComponent,
    WaterConsumptionUpdateComponent,
    WaterConsumptionDeleteDialogComponent,
    WaterConsumptionDeletePopupComponent
  ],
  entryComponents: [WaterConsumptionDeleteDialogComponent]
})
export class SmarfarmWaterConsumptionModule {}
