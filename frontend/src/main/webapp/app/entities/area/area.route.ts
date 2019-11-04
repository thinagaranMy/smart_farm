import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Area } from 'app/shared/model/area.model';
import { AreaService } from './area.service';
import { AreaComponent } from './area.component';
import { AreaDetailComponent } from './area-detail.component';
import { AreaUpdateComponent } from './area-update.component';
import { AreaDeletePopupComponent } from './area-delete-dialog.component';
import { IArea } from 'app/shared/model/area.model';

@Injectable({ providedIn: 'root' })
export class AreaResolve implements Resolve<IArea> {
  constructor(private service: AreaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArea> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Area>) => response.ok),
        map((area: HttpResponse<Area>) => area.body)
      );
    }
    return of(new Area());
  }
}

export const areaRoute: Routes = [
  {
    path: '',
    component: AreaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.area.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AreaDetailComponent,
    resolve: {
      area: AreaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.area.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AreaUpdateComponent,
    resolve: {
      area: AreaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.area.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AreaUpdateComponent,
    resolve: {
      area: AreaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.area.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const areaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AreaDeletePopupComponent,
    resolve: {
      area: AreaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.area.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
