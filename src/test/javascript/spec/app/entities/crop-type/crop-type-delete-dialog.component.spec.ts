import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SmartFarmSolutionTestModule } from '../../../test.module';
import { CropTypeDeleteDialogComponent } from 'app/entities/crop-type/crop-type-delete-dialog.component';
import { CropTypeService } from 'app/entities/crop-type/crop-type.service';

describe('Component Tests', () => {
  describe('CropType Management Delete Component', () => {
    let comp: CropTypeDeleteDialogComponent;
    let fixture: ComponentFixture<CropTypeDeleteDialogComponent>;
    let service: CropTypeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmartFarmSolutionTestModule],
        declarations: [CropTypeDeleteDialogComponent]
      })
        .overrideTemplate(CropTypeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CropTypeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CropTypeService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
