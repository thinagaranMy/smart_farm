import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SmartFarmSolutionTestModule } from '../../../test.module';
import { WaterConsumptionDeleteDialogComponent } from 'app/entities/water-consumption/water-consumption-delete-dialog.component';
import { WaterConsumptionService } from 'app/entities/water-consumption/water-consumption.service';

describe('Component Tests', () => {
  describe('WaterConsumption Management Delete Component', () => {
    let comp: WaterConsumptionDeleteDialogComponent;
    let fixture: ComponentFixture<WaterConsumptionDeleteDialogComponent>;
    let service: WaterConsumptionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmartFarmSolutionTestModule],
        declarations: [WaterConsumptionDeleteDialogComponent]
      })
        .overrideTemplate(WaterConsumptionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WaterConsumptionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WaterConsumptionService);
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
