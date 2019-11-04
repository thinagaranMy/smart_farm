import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFarm } from 'app/shared/model/farm.model';

type EntityResponseType = HttpResponse<IFarm>;
type EntityArrayResponseType = HttpResponse<IFarm[]>;

@Injectable({ providedIn: 'root' })
export class FarmService {
  public resourceUrl = SERVER_API_URL + 'api/farms';

  constructor(protected http: HttpClient) {}

  create(farm: IFarm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(farm);
    return this.http
      .post<IFarm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(farm: IFarm): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(farm);
    return this.http
      .put<IFarm>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFarm>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFarm[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(farm: IFarm): IFarm {
    const copy: IFarm = Object.assign({}, farm, {
      creationDate: farm.creationDate != null && farm.creationDate.isValid() ? farm.creationDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((farm: IFarm) => {
        farm.creationDate = farm.creationDate != null ? moment(farm.creationDate) : null;
      });
    }
    return res;
  }
}
