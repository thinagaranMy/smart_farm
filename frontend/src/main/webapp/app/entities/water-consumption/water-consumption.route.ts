import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WaterConsumption } from 'app/shared/model/water-consumption.model';
import { WaterConsumptionService } from './water-consumption.service';
import { WaterConsumptionComponent } from './water-consumption.component';
import { WaterConsumptionDetailComponent } from './water-consumption-detail.component';
import { WaterConsumptionUpdateComponent } from './water-consumption-update.component';
import { WaterConsumptionDeletePopupComponent } from './water-consumption-delete-dialog.component';
import { IWaterConsumption } from 'app/shared/model/water-consumption.model';

@Injectable({ providedIn: 'root' })
export class WaterConsumptionResolve implements Resolve<IWaterConsumption> {
  constructor(private service: WaterConsumptionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWaterConsumption> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<WaterConsumption>) => response.ok),
        map((waterConsumption: HttpResponse<WaterConsumption>) => waterConsumption.body)
      );
    }
    return of(new WaterConsumption());
  }
}

export const waterConsumptionRoute: Routes = [
  {
    path: '',
    component: WaterConsumptionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.waterConsumption.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WaterConsumptionDetailComponent,
    resolve: {
      waterConsumption: WaterConsumptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.waterConsumption.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WaterConsumptionUpdateComponent,
    resolve: {
      waterConsumption: WaterConsumptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.waterConsumption.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WaterConsumptionUpdateComponent,
    resolve: {
      waterConsumption: WaterConsumptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.waterConsumption.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const waterConsumptionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: WaterConsumptionDeletePopupComponent,
    resolve: {
      waterConsumption: WaterConsumptionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.waterConsumption.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
