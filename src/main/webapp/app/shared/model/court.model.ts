import { ICourt } from 'app/shared/model/court.model';
import { Terrain } from 'app/shared/model/enumerations/terrain.model';

export interface ICourt {
  id?: number;
  numero?: Terrain;
  reservation?: ICourt;
}

export class Court implements ICourt {
  constructor(public id?: number, public numero?: Terrain, public reservation?: ICourt) {}
}
