import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWaterConsumption } from 'app/shared/model/water-consumption.model';

@Component({
  selector: 'jhi-water-consumption-detail',
  templateUrl: './water-consumption-detail.component.html'
})
export class WaterConsumptionDetailComponent implements OnInit {
  waterConsumption: IWaterConsumption;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ waterConsumption }) => {
      this.waterConsumption = waterConsumption;
    });
  }

  previousState() {
    window.history.back();
  }
}
