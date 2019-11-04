import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlantation } from 'app/shared/model/plantation.model';

type EntityResponseType = HttpResponse<IPlantation>;
type EntityArrayResponseType = HttpResponse<IPlantation[]>;

@Injectable({ providedIn: 'root' })
export class PlantationService {
  public resourceUrl = SERVER_API_URL + 'api/plantations';

  constructor(protected http: HttpClient) {}

  create(plantation: IPlantation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(plantation);
    return this.http
      .post<IPlantation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(plantation: IPlantation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(plantation);
    return this.http
      .put<IPlantation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlantation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlantation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(plantation: IPlantation): IPlantation {
    const copy: IPlantation = Object.assign({}, plantation, {
      plantDate: plantation.plantDate != null && plantation.plantDate.isValid() ? plantation.plantDate.toJSON() : null,
      endDate: plantation.endDate != null && plantation.endDate.isValid() ? plantation.endDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.plantDate = res.body.plantDate != null ? moment(res.body.plantDate) : null;
      res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((plantation: IPlantation) => {
        plantation.plantDate = plantation.plantDate != null ? moment(plantation.plantDate) : null;
        plantation.endDate = plantation.endDate != null ? moment(plantation.endDate) : null;
      });
    }
    return res;
  }
}
