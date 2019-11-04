import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SmarfarmTestModule } from '../../../test.module';
import { PlantationUpdateComponent } from 'app/entities/plantation/plantation-update.component';
import { PlantationService } from 'app/entities/plantation/plantation.service';
import { Plantation } from 'app/shared/model/plantation.model';

describe('Component Tests', () => {
  describe('Plantation Management Update Component', () => {
    let comp: PlantationUpdateComponent;
    let fixture: ComponentFixture<PlantationUpdateComponent>;
    let service: PlantationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmarfarmTestModule],
        declarations: [PlantationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlantationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlantationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlantationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Plantation(123);
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
        const entity = new Plantation();
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
