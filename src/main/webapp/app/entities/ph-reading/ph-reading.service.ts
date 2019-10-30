import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPhReading } from 'app/shared/model/ph-reading.model';

type EntityResponseType = HttpResponse<IPhReading>;
type EntityArrayResponseType = HttpResponse<IPhReading[]>;

@Injectable({ providedIn: 'root' })
export class PhReadingService {
  public resourceUrl = SERVER_API_URL + 'api/ph-readings';

  constructor(protected http: HttpClient) {}

  create(phReading: IPhReading): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(phReading);
    return this.http
      .post<IPhReading>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(phReading: IPhReading): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(phReading);
    return this.http
      .put<IPhReading>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPhReading>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPhReading[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(phReading: IPhReading): IPhReading {
    const copy: IPhReading = Object.assign({}, phReading, {
      date: phReading.date != null && phReading.date.isValid() ? phReading.date.toJSON() : null
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
      res.body.forEach((phReading: IPhReading) => {
        phReading.date = phReading.date != null ? moment(phReading.date) : null;
      });
    }
    return res;
  }
}
