import { Moment } from 'moment';
import { IArea } from 'app/shared/model/area.model';

export interface IWaterConsumption {
  id?: number;
  date?: Moment;
  millimiters?: number;
  area?: IArea;
}

export class WaterConsumption implements IWaterConsumption {
  constructor(public id?: number, public date?: Moment, public millimiters?: number, public area?: IArea) {}
}
