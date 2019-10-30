import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICropType, CropType } from 'app/shared/model/crop-type.model';
import { CropTypeService } from './crop-type.service';

@Component({
  selector: 'jhi-crop-type-update',
  templateUrl: './crop-type-update.component.html'
})
export class CropTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    cropName: []
  });

  constructor(protected cropTypeService: CropTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cropType }) => {
      this.updateForm(cropType);
    });
  }

  updateForm(cropType: ICropType) {
    this.editForm.patchValue({
      id: cropType.id,
      cropName: cropType.cropName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cropType = this.createFromForm();
    if (cropType.id !== undefined) {
      this.subscribeToSaveResponse(this.cropTypeService.update(cropType));
    } else {
      this.subscribeToSaveResponse(this.cropTypeService.create(cropType));
    }
  }

  private createFromForm(): ICropType {
    return {
      ...new CropType(),
      id: this.editForm.get(['id']).value,
      cropName: this.editForm.get(['cropName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICropType>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
