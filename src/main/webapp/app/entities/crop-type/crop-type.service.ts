import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICropType } from 'app/shared/model/crop-type.model';

type EntityResponseType = HttpResponse<ICropType>;
type EntityArrayResponseType = HttpResponse<ICropType[]>;

@Injectable({ providedIn: 'root' })
export class CropTypeService {
  public resourceUrl = SERVER_API_URL + 'api/crop-types';

  constructor(protected http: HttpClient) {}

  create(cropType: ICropType): Observable<EntityResponseType> {
    return this.http.post<ICropType>(this.resourceUrl, cropType, { observe: 'response' });
  }

  update(cropType: ICropType): Observable<EntityResponseType> {
    return this.http.put<ICropType>(this.resourceUrl, cropType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICropType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICropType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
