import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlantation } from 'app/shared/model/plantation.model';
import { PlantationService } from './plantation.service';

@Component({
  selector: 'jhi-plantation-delete-dialog',
  templateUrl: './plantation-delete-dialog.component.html'
})
export class PlantationDeleteDialogComponent {
  plantation: IPlantation;

  constructor(
    protected plantationService: PlantationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.plantationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'plantationListModification',
        content: 'Deleted an plantation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-plantation-delete-popup',
  template: ''
})
export class PlantationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ plantation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlantationDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.plantation = plantation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/plantation', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/plantation', { outlets: { popup: null } }]);
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
