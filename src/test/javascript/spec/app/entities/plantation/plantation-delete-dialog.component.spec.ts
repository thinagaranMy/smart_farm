import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SmartFarmSolutionTestModule } from '../../../test.module';
import { PlantationDeleteDialogComponent } from 'app/entities/plantation/plantation-delete-dialog.component';
import { PlantationService } from 'app/entities/plantation/plantation.service';

describe('Component Tests', () => {
  describe('Plantation Management Delete Component', () => {
    let comp: PlantationDeleteDialogComponent;
    let fixture: ComponentFixture<PlantationDeleteDialogComponent>;
    let service: PlantationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmartFarmSolutionTestModule],
        declarations: [PlantationDeleteDialogComponent]
      })
        .overrideTemplate(PlantationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlantationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlantationService);
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
