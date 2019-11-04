import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SmarfarmTestModule } from '../../../test.module';
import { PhReadingUpdateComponent } from 'app/entities/ph-reading/ph-reading-update.component';
import { PhReadingService } from 'app/entities/ph-reading/ph-reading.service';
import { PhReading } from 'app/shared/model/ph-reading.model';

describe('Component Tests', () => {
  describe('PhReading Management Update Component', () => {
    let comp: PhReadingUpdateComponent;
    let fixture: ComponentFixture<PhReadingUpdateComponent>;
    let service: PhReadingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmarfarmTestModule],
        declarations: [PhReadingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PhReadingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PhReadingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PhReadingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PhReading(123);
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
        const entity = new PhReading();
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
