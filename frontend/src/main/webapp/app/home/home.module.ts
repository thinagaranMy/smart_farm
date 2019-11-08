import { HomeCarouselComponent } from './../home-carousel/home-carousel.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmarfarmSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { SmarfarmDashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  imports: [
    SmarfarmSharedModule, 
    SmarfarmDashboardModule, 
    RouterModule.forChild([HOME_ROUTE])
    ],
  declarations: [
    HomeComponent,
    HomeCarouselComponent]
})
export class SmarfarmHomeModule {}
