import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFarm } from 'app/shared/model/farm.model';

@Component({
  selector: 'jhi-farm-detail',
  templateUrl: './farm-detail.component.html'
})
export class FarmDetailComponent implements OnInit {
  farm: IFarm;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ farm }) => {
      this.farm = farm;
    });
  }

  previousState() {
    window.history.back();
  }
}
