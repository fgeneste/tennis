import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'reservation',
        loadChildren: () => import('./reservation/reservation.module').then(m => m.TennisReservationModule)
      },
      {
        path: 'joueur',
        loadChildren: () => import('./joueur/joueur.module').then(m => m.TennisJoueurModule)
      },
      {
        path: 'court',
        loadChildren: () => import('./court/court.module').then(m => m.TennisCourtModule)
      },
      {
        path: 'horaire',
        loadChildren: () => import('./horaire/horaire.module').then(m => m.TennisHoraireModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class TennisEntityModule {}
