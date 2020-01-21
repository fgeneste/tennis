import { Moment } from 'moment';
import { IReservation } from 'app/shared/model/reservation.model';

export interface IHoraire {
  id?: number;
  jour?: Moment;
  reservation?: IReservation;
}

export class Horaire implements IHoraire {
  constructor(public id?: number, public jour?: Moment, public reservation?: IReservation) {}
}
