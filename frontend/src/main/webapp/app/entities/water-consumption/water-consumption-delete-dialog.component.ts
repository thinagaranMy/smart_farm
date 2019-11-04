import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWaterConsumption } from 'app/shared/model/water-consumption.model';
import { WaterConsumptionService } from './water-consumption.service';

@Component({
  selector: 'jhi-water-consumption-delete-dialog',
  templateUrl: './water-consumption-delete-dialog.component.html'
})
export class WaterConsumptionDeleteDialogComponent {
  waterConsumption: IWaterConsumption;

  constructor(
    protected waterConsumptionService: WaterConsumptionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.waterConsumptionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'waterConsumptionListModification',
        content: 'Deleted an waterConsumption'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-water-consumption-delete-popup',
  template: ''
})
export class WaterConsumptionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ waterConsumption }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(WaterConsumptionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.waterConsumption = waterConsumption;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/water-consumption', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/water-consumption', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
