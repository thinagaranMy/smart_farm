import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Farm } from 'app/shared/model/farm.model';
import { FarmService } from './farm.service';
import { FarmComponent } from './farm.component';
import { FarmDetailComponent } from './farm-detail.component';
import { FarmUpdateComponent } from './farm-update.component';
import { FarmDeletePopupComponent } from './farm-delete-dialog.component';
import { IFarm } from 'app/shared/model/farm.model';

@Injectable({ providedIn: 'root' })
export class FarmResolve implements Resolve<IFarm> {
  constructor(private service: FarmService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFarm> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Farm>) => response.ok),
        map((farm: HttpResponse<Farm>) => farm.body)
      );
    }
    return of(new Farm());
  }
}

export const farmRoute: Routes = [
  {
    path: '',
    component: FarmComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.farm.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FarmDetailComponent,
    resolve: {
      farm: FarmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.farm.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FarmUpdateComponent,
    resolve: {
      farm: FarmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.farm.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FarmUpdateComponent,
    resolve: {
      farm: FarmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.farm.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const farmPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FarmDeletePopupComponent,
    resolve: {
      farm: FarmResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.farm.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
