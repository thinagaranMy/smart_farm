import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CropType } from 'app/shared/model/crop-type.model';
import { CropTypeService } from './crop-type.service';
import { CropTypeComponent } from './crop-type.component';
import { CropTypeDetailComponent } from './crop-type-detail.component';
import { CropTypeUpdateComponent } from './crop-type-update.component';
import { CropTypeDeletePopupComponent } from './crop-type-delete-dialog.component';
import { ICropType } from 'app/shared/model/crop-type.model';

@Injectable({ providedIn: 'root' })
export class CropTypeResolve implements Resolve<ICropType> {
  constructor(private service: CropTypeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICropType> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CropType>) => response.ok),
        map((cropType: HttpResponse<CropType>) => cropType.body)
      );
    }
    return of(new CropType());
  }
}

export const cropTypeRoute: Routes = [
  {
    path: '',
    component: CropTypeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.cropType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CropTypeDetailComponent,
    resolve: {
      cropType: CropTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.cropType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CropTypeUpdateComponent,
    resolve: {
      cropType: CropTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.cropType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CropTypeUpdateComponent,
    resolve: {
      cropType: CropTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.cropType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const cropTypePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CropTypeDeletePopupComponent,
    resolve: {
      cropType: CropTypeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.cropType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
