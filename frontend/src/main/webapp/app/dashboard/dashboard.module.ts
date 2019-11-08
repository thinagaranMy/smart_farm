import { WaterConsumptionByAreaGraphComponent } from './../water-consumption-by-area-graph/water-consumption-by-area-graph.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WaterConsumptionByAreaGraphComponent
    ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class SmarfarmDashboardModule { }
