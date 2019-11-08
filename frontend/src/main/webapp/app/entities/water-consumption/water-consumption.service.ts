import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWaterConsumption } from 'app/shared/model/water-consumption.model';

type EntityResponseType = HttpResponse<IWaterConsumption>;
type EntityArrayResponseType = HttpResponse<IWaterConsumption[]>;

@Injectable({ providedIn: 'root' })
export class WaterConsumptionService {
  public resourceUrl = SERVER_API_URL + 'api/water-consumptions';

  constructor(protected http: HttpClient) {}

  create(waterConsumption: IWaterConsumption): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(waterConsumption);
    return this.http
      .post<IWaterConsumption>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(waterConsumption: IWaterConsumption): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(waterConsumption);
    return this.http
      .put<IWaterConsumption>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    
    return this.http
      .get<IWaterConsumption>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByArea(id: number): Observable<EntityArrayResponseType>{
    const areaurl : string =  this.resourceUrl + '-area?id=' ;
     return this.http
      .get<IWaterConsumption[]>(areaurl + id , { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IWaterConsumption[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(waterConsumption: IWaterConsumption): IWaterConsumption {
    const copy: IWaterConsumption = Object.assign({}, waterConsumption, {
      date: waterConsumption.date != null && waterConsumption.date.isValid() ? waterConsumption.date.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((waterConsumption: IWaterConsumption) => {
        waterConsumption.date = waterConsumption.date != null ? moment(waterConsumption.date) : null;
      });
    }
    return res;
  }
}
