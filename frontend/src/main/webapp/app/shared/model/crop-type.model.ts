export interface ICropType {
  id?: number;
  cropName?: string;
}

export class CropType implements ICropType {
  constructor(public id?: number, public cropName?: string) {}
}
