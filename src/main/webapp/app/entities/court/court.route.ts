import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICourt, Court } from 'app/shared/model/court.model';
import { CourtService } from './court.service';
import { CourtComponent } from './court.component';
import { CourtDetailComponent } from './court-detail.component';
import { CourtUpdateComponent } from './court-update.component';

@Injectable({ providedIn: 'root' })
export class CourtResolve implements Resolve<ICourt> {
  constructor(private service: CourtService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICourt> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((court: HttpResponse<Court>) => {
          if (court.body) {
            return of(court.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Court());
  }
}

export const courtRoute: Routes = [
  {
    path: '',
    component: CourtComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.court.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CourtDetailComponent,
    resolve: {
      court: CourtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.court.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CourtUpdateComponent,
    resolve: {
      court: CourtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.court.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CourtUpdateComponent,
    resolve: {
      court: CourtResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.court.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
