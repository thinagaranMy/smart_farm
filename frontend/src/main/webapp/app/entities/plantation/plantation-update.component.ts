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
import { IPlantation, Plantation } from 'app/shared/model/plantation.model';
import { PlantationService } from './plantation.service';
import { ICropType } from 'app/shared/model/crop-type.model';
import { CropTypeService } from 'app/entities/crop-type/crop-type.service';

@Component({
  selector: 'jhi-plantation-update',
  templateUrl: './plantation-update.component.html'
})
export class PlantationUpdateComponent implements OnInit {
  isSaving: boolean;

  croptypes: ICropType[];

  editForm = this.fb.group({
    id: [],
    plantDate: [],
    endDate: [],
    cropType: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected plantationService: PlantationService,
    protected cropTypeService: CropTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ plantation }) => {
      this.updateForm(plantation);
    });
    this.cropTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICropType[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICropType[]>) => response.body)
      )
      .subscribe((res: ICropType[]) => (this.croptypes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(plantation: IPlantation) {
    this.editForm.patchValue({
      id: plantation.id,
      plantDate: plantation.plantDate != null ? plantation.plantDate.format(DATE_TIME_FORMAT) : null,
      endDate: plantation.endDate != null ? plantation.endDate.format(DATE_TIME_FORMAT) : null,
      cropType: plantation.cropType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const plantation = this.createFromForm();
    if (plantation.id !== undefined) {
      this.subscribeToSaveResponse(this.plantationService.update(plantation));
    } else {
      this.subscribeToSaveResponse(this.plantationService.create(plantation));
    }
  }

  private createFromForm(): IPlantation {
    return {
      ...new Plantation(),
      id: this.editForm.get(['id']).value,
      plantDate:
        this.editForm.get(['plantDate']).value != null ? moment(this.editForm.get(['plantDate']).value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate']).value != null ? moment(this.editForm.get(['endDate']).value, DATE_TIME_FORMAT) : undefined,
      cropType: this.editForm.get(['cropType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlantation>>) {
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

  trackCropTypeById(index: number, item: ICropType) {
    return item.id;
  }
}
