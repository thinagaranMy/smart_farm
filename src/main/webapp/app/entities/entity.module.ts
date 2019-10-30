import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'farm',
        loadChildren: () => import('./farm/farm.module').then(m => m.SmartFarmSolutionFarmModule)
      },
      {
        path: 'area',
        loadChildren: () => import('./area/area.module').then(m => m.SmartFarmSolutionAreaModule)
      },
      {
        path: 'water-consumption',
        loadChildren: () => import('./water-consumption/water-consumption.module').then(m => m.SmartFarmSolutionWaterConsumptionModule)
      },
      {
        path: 'ph-reading',
        loadChildren: () => import('./ph-reading/ph-reading.module').then(m => m.SmartFarmSolutionPhReadingModule)
      },
      {
        path: 'crop-type',
        loadChildren: () => import('./crop-type/crop-type.module').then(m => m.SmartFarmSolutionCropTypeModule)
      },
      {
        path: 'plantation',
        loadChildren: () => import('./plantation/plantation.module').then(m => m.SmartFarmSolutionPlantationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SmartFarmSolutionEntityModule {}
