import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFarm } from 'app/shared/model/farm.model';
import { FarmService } from './farm.service';

@Component({
  selector: 'jhi-farm-delete-dialog',
  templateUrl: './farm-delete-dialog.component.html'
})
export class FarmDeleteDialogComponent {
  farm: IFarm;

  constructor(protected farmService: FarmService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.farmService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'farmListModification',
        content: 'Deleted an farm'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-farm-delete-popup',
  template: ''
})
export class FarmDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ farm }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FarmDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.farm = farm;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/farm', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/farm', { outlets: { popup: null } }]);
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
