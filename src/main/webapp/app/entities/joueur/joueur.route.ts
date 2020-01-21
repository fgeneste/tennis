import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IJoueur, Joueur } from 'app/shared/model/joueur.model';
import { JoueurService } from './joueur.service';
import { JoueurComponent } from './joueur.component';
import { JoueurDetailComponent } from './joueur-detail.component';
import { JoueurUpdateComponent } from './joueur-update.component';

@Injectable({ providedIn: 'root' })
export class JoueurResolve implements Resolve<IJoueur> {
  constructor(private service: JoueurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJoueur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((joueur: HttpResponse<Joueur>) => {
          if (joueur.body) {
            return of(joueur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Joueur());
  }
}

export const joueurRoute: Routes = [
  {
    path: '',
    component: JoueurComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.joueur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JoueurDetailComponent,
    resolve: {
      joueur: JoueurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.joueur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JoueurUpdateComponent,
    resolve: {
      joueur: JoueurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.joueur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JoueurUpdateComponent,
    resolve: {
      joueur: JoueurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'tennisApp.joueur.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
