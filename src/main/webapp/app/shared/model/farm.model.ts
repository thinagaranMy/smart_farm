import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IFarm {
  id?: number;
  creationDate?: Moment;
  owner?: IUser;
}

export class Farm implements IFarm {
  constructor(public id?: number, public creationDate?: Moment, public owner?: IUser) {}
}
