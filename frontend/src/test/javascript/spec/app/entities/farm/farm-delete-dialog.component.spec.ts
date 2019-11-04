import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SmarfarmTestModule } from '../../../test.module';
import { FarmDeleteDialogComponent } from 'app/entities/farm/farm-delete-dialog.component';
import { FarmService } from 'app/entities/farm/farm.service';

describe('Component Tests', () => {
  describe('Farm Management Delete Component', () => {
    let comp: FarmDeleteDialogComponent;
    let fixture: ComponentFixture<FarmDeleteDialogComponent>;
    let service: FarmService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmarfarmTestModule],
        declarations: [FarmDeleteDialogComponent]
      })
        .overrideTemplate(FarmDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FarmDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FarmService);
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
