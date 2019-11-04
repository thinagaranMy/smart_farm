import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICropType } from 'app/shared/model/crop-type.model';

@Component({
  selector: 'jhi-crop-type-detail',
  templateUrl: './crop-type-detail.component.html'
})
export class CropTypeDetailComponent implements OnInit {
  cropType: ICropType;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cropType }) => {
      this.cropType = cropType;
    });
  }

  previousState() {
    window.history.back();
  }
}
