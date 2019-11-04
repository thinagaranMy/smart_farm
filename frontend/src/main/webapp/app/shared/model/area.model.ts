import { IFarm } from 'app/shared/model/farm.model';
import { IPlantation } from 'app/shared/model/plantation.model';

export interface IArea {
  id?: number;
  size?: number;
  farm?: IFarm;
  plantation?: IPlantation;
}

export class Area implements IArea {
  constructor(public id?: number, public size?: number, public farm?: IFarm, public plantation?: IPlantation) {}
}
