import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPhReading, PhReading } from 'app/shared/model/ph-reading.model';
import { PhReadingService } from './ph-reading.service';
import { IArea } from 'app/shared/model/area.model';
import { AreaService } from 'app/entities/area/area.service';

@Component({
  selector: 'jhi-ph-reading-update',
  templateUrl: './ph-reading-update.component.html'
})
export class PhReadingUpdateComponent implements OnInit {
  isSaving: boolean;

  areas: IArea[];

  editForm = this.fb.group({
    id: [],
    phReading: [],
    date: [],
    area: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected phReadingService: PhReadingService,
    protected areaService: AreaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ phReading }) => {
      this.updateForm(phReading);
    });
    this.areaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArea[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArea[]>) => response.body)
      )
      .subscribe((res: IArea[]) => (this.areas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(phReading: IPhReading) {
    this.editForm.patchValue({
      id: phReading.id,
      phReading: phReading.phReading,
      date: phReading.date != null ? phReading.date.format(DATE_TIME_FORMAT) : null,
      area: phReading.area
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const phReading = this.createFromForm();
    if (phReading.id !== undefined) {
      this.subscribeToSaveResponse(this.phReadingService.update(phReading));
    } else {
      this.subscribeToSaveResponse(this.phReadingService.create(phReading));
    }
  }

  private createFromForm(): IPhReading {
    return {
      ...new PhReading(),
      id: this.editForm.get(['id']).value,
      phReading: this.editForm.get(['phReading']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      area: this.editForm.get(['area']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhReading>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackAreaById(index: number, item: IArea) {
    return item.id;
  }
}
