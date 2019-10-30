import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlantation } from 'app/shared/model/plantation.model';

@Component({
  selector: 'jhi-plantation-detail',
  templateUrl: './plantation-detail.component.html'
})
export class PlantationDetailComponent implements OnInit {
  plantation: IPlantation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ plantation }) => {
      this.plantation = plantation;
    });
  }

  previousState() {
    window.history.back();
  }
}
