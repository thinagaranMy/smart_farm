import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICropType } from 'app/shared/model/crop-type.model';
import { CropTypeService } from './crop-type.service';

@Component({
  selector: 'jhi-crop-type-delete-dialog',
  templateUrl: './crop-type-delete-dialog.component.html'
})
export class CropTypeDeleteDialogComponent {
  cropType: ICropType;

  constructor(protected cropTypeService: CropTypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.cropTypeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'cropTypeListModification',
        content: 'Deleted an cropType'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-crop-type-delete-popup',
  template: ''
})
export class CropTypeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ cropType }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CropTypeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.cropType = cropType;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/crop-type', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/crop-type', { outlets: { popup: null } }]);
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
