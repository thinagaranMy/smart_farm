import { Moment } from 'moment';
import { IArea } from 'app/shared/model/area.model';
import { ICropType } from 'app/shared/model/crop-type.model';

export interface IPlantation {
  id?: number;
  plantDate?: Moment;
  endDate?: Moment;
  areas?: IArea[];
  cropType?: ICropType;
}

export class Plantation implements IPlantation {
  constructor(
    public id?: number,
    public plantDate?: Moment,
    public endDate?: Moment,
    public areas?: IArea[],
    public cropType?: ICropType
  ) {}
}
