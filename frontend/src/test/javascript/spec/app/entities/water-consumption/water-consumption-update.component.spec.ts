import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SmarfarmTestModule } from '../../../test.module';
import { WaterConsumptionUpdateComponent } from 'app/entities/water-consumption/water-consumption-update.component';
import { WaterConsumptionService } from 'app/entities/water-consumption/water-consumption.service';
import { WaterConsumption } from 'app/shared/model/water-consumption.model';

describe('Component Tests', () => {
  describe('WaterConsumption Management Update Component', () => {
    let comp: WaterConsumptionUpdateComponent;
    let fixture: ComponentFixture<WaterConsumptionUpdateComponent>;
    let service: WaterConsumptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmarfarmTestModule],
        declarations: [WaterConsumptionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(WaterConsumptionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WaterConsumptionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WaterConsumptionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WaterConsumption(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new WaterConsumption();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
