import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Plantation } from 'app/shared/model/plantation.model';
import { PlantationService } from './plantation.service';
import { PlantationComponent } from './plantation.component';
import { PlantationDetailComponent } from './plantation-detail.component';
import { PlantationUpdateComponent } from './plantation-update.component';
import { PlantationDeletePopupComponent } from './plantation-delete-dialog.component';
import { IPlantation } from 'app/shared/model/plantation.model';

@Injectable({ providedIn: 'root' })
export class PlantationResolve implements Resolve<IPlantation> {
  constructor(private service: PlantationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlantation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Plantation>) => response.ok),
        map((plantation: HttpResponse<Plantation>) => plantation.body)
      );
    }
    return of(new Plantation());
  }
}

export const plantationRoute: Routes = [
  {
    path: '',
    component: PlantationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.plantation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlantationDetailComponent,
    resolve: {
      plantation: PlantationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.plantation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlantationUpdateComponent,
    resolve: {
      plantation: PlantationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.plantation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlantationUpdateComponent,
    resolve: {
      plantation: PlantationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.plantation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const plantationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlantationDeletePopupComponent,
    resolve: {
      plantation: PlantationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smarfarmApp.plantation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
