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
import { IWaterConsumption, WaterConsumption } from 'app/shared/model/water-consumption.model';
import { WaterConsumptionService } from './water-consumption.service';
import { IArea } from 'app/shared/model/area.model';
import { AreaService } from 'app/entities/area/area.service';

@Component({
  selector: 'jhi-water-consumption-update',
  templateUrl: './water-consumption-update.component.html'
})
export class WaterConsumptionUpdateComponent implements OnInit {
  isSaving: boolean;

  areas: IArea[];

  editForm = this.fb.group({
    id: [],
    date: [],
    millimiters: [],
    area: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected waterConsumptionService: WaterConsumptionService,
    protected areaService: AreaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ waterConsumption }) => {
      this.updateForm(waterConsumption);
    });
    this.areaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArea[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArea[]>) => response.body)
      )
      .subscribe((res: IArea[]) => (this.areas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(waterConsumption: IWaterConsumption) {
    this.editForm.patchValue({
      id: waterConsumption.id,
      date: waterConsumption.date != null ? waterConsumption.date.format(DATE_TIME_FORMAT) : null,
      millimiters: waterConsumption.millimiters,
      area: waterConsumption.area
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const waterConsumption = this.createFromForm();
    if (waterConsumption.id !== undefined) {
      this.subscribeToSaveResponse(this.waterConsumptionService.update(waterConsumption));
    } else {
      this.subscribeToSaveResponse(this.waterConsumptionService.create(waterConsumption));
    }
  }

  private createFromForm(): IWaterConsumption {
    return {
      ...new WaterConsumption(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      millimiters: this.editForm.get(['millimiters']).value,
      area: this.editForm.get(['area']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWaterConsumption>>) {
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
