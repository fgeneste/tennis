import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHoraire, Horaire } from 'app/shared/model/horaire.model';
import { HoraireService } from './horaire.service';
import { HoraireComponent } from './horaire.component';
import { HoraireDetailComponent } from './horaire-detail.component';
import { HoraireUpdateComponent } from './horaire-update.component';

@Injectable({ providedIn: 'root' })
export class HoraireResolve implements Resolve<IHoraire> {
  constructor(private service: HoraireService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHoraire> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((horaire: HttpResponse<Horaire>) => {
          if (horaire.body) {
            return of(horaire.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Horaire());
  }
}

export const horaireRoute: Routes = [
  {
    path: '',
    component: HoraireComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.horaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HoraireDetailComponent,
    resolve: {
      horaire: HoraireResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.horaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HoraireUpdateComponent,
    resolve: {
      horaire: HoraireResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.horaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HoraireUpdateComponent,
    resolve: {
      horaire: HoraireResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.horaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
