import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IArea, Area } from 'app/shared/model/area.model';
import { AreaService } from './area.service';
import { IFarm } from 'app/shared/model/farm.model';
import { FarmService } from 'app/entities/farm/farm.service';
import { IPlantation } from 'app/shared/model/plantation.model';
import { PlantationService } from 'app/entities/plantation/plantation.service';

@Component({
  selector: 'jhi-area-update',
  templateUrl: './area-update.component.html'
})
export class AreaUpdateComponent implements OnInit {
  isSaving: boolean;

  farms: IFarm[];

  plantations: IPlantation[];

  editForm = this.fb.group({
    id: [],
    size: [],
    farm: [],
    plantation: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected areaService: AreaService,
    protected farmService: FarmService,
    protected plantationService: PlantationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ area }) => {
      this.updateForm(area);
    });
    this.farmService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFarm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFarm[]>) => response.body)
      )
      .subscribe((res: IFarm[]) => (this.farms = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.plantationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlantation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlantation[]>) => response.body)
      )
      .subscribe((res: IPlantation[]) => (this.plantations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(area: IArea) {
    this.editForm.patchValue({
      id: area.id,
      size: area.size,
      farm: area.farm,
      plantation: area.plantation
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const area = this.createFromForm();
    if (area.id !== undefined) {
      this.subscribeToSaveResponse(this.areaService.update(area));
    } else {
      this.subscribeToSaveResponse(this.areaService.create(area));
    }
  }

  private createFromForm(): IArea {
    return {
      ...new Area(),
      id: this.editForm.get(['id']).value,
      size: this.editForm.get(['size']).value,
      farm: this.editForm.get(['farm']).value,
      plantation: this.editForm.get(['plantation']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArea>>) {
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

  trackFarmById(index: number, item: IFarm) {
    return item.id;
  }

  trackPlantationById(index: number, item: IPlantation) {
    return item.id;
  }
}
