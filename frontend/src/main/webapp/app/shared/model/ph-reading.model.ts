import { Moment } from 'moment';
import { IArea } from 'app/shared/model/area.model';

export interface IPhReading {
  id?: number;
  phReading?: number;
  date?: Moment;
  area?: IArea;
}

export class PhReading implements IPhReading {
  constructor(public id?: number, public phReading?: number, public date?: Moment, public area?: IArea) {}
}
