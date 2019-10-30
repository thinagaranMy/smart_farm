import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhReading } from 'app/shared/model/ph-reading.model';

@Component({
  selector: 'jhi-ph-reading-detail',
  templateUrl: './ph-reading-detail.component.html'
})
export class PhReadingDetailComponent implements OnInit {
  phReading: IPhReading;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ phReading }) => {
      this.phReading = phReading;
    });
  }

  previousState() {
    window.history.back();
  }
}
