import { ICourt } from 'app/shared/model/court.model';
import { IJoueur } from 'app/shared/model/joueur.model';
import { IHoraire } from 'app/shared/model/horaire.model';

export interface IReservation {
  id?: number;
  court?: ICourt;
  joueur?: IJoueur;
  horaire?: IHoraire;
}

export class Reservation implements IReservation {
  constructor(public id?: number, public court?: ICourt, public joueur?: IJoueur, public horaire?: IHoraire) {}
}
