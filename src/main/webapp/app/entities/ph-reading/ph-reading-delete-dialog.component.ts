import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPhReading } from 'app/shared/model/ph-reading.model';
import { PhReadingService } from './ph-reading.service';

@Component({
  selector: 'jhi-ph-reading-delete-dialog',
  templateUrl: './ph-reading-delete-dialog.component.html'
})
export class PhReadingDeleteDialogComponent {
  phReading: IPhReading;

  constructor(protected phReadingService: PhReadingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.phReadingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'phReadingListModification',
        content: 'Deleted an phReading'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ph-reading-delete-popup',
  template: ''
})
export class PhReadingDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ phReading }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PhReadingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.phReading = phReading;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/ph-reading', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/ph-reading', { outlets: { popup: null } }]);
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
