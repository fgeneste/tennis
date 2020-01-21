import { IReservation } from 'app/shared/model/reservation.model';

export interface IJoueur {
  id?: number;
  prenom?: string;
  nom?: string;
  login?: string;
  reservation?: IReservation;
}

export class Joueur implements IJoueur {
  constructor(public id?: number, public prenom?: string, public nom?: string, public login?: string, public reservation?: IReservation) {}
}
