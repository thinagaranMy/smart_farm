import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PhReading } from 'app/shared/model/ph-reading.model';
import { PhReadingService } from './ph-reading.service';
import { PhReadingComponent } from './ph-reading.component';
import { PhReadingDetailComponent } from './ph-reading-detail.component';
import { PhReadingUpdateComponent } from './ph-reading-update.component';
import { PhReadingDeletePopupComponent } from './ph-reading-delete-dialog.component';
import { IPhReading } from 'app/shared/model/ph-reading.model';

@Injectable({ providedIn: 'root' })
export class PhReadingResolve implements Resolve<IPhReading> {
  constructor(private service: PhReadingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPhReading> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PhReading>) => response.ok),
        map((phReading: HttpResponse<PhReading>) => phReading.body)
      );
    }
    return of(new PhReading());
  }
}

export const phReadingRoute: Routes = [
  {
    path: '',
    component: PhReadingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.phReading.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PhReadingDetailComponent,
    resolve: {
      phReading: PhReadingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.phReading.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PhReadingUpdateComponent,
    resolve: {
      phReading: PhReadingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.phReading.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PhReadingUpdateComponent,
    resolve: {
      phReading: PhReadingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.phReading.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const phReadingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PhReadingDeletePopupComponent,
    resolve: {
      phReading: PhReadingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'smartFarmSolutionApp.phReading.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
