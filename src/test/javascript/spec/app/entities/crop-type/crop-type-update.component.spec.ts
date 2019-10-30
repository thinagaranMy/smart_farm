import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SmartFarmSolutionTestModule } from '../../../test.module';
import { CropTypeUpdateComponent } from 'app/entities/crop-type/crop-type-update.component';
import { CropTypeService } from 'app/entities/crop-type/crop-type.service';
import { CropType } from 'app/shared/model/crop-type.model';

describe('Component Tests', () => {
  describe('CropType Management Update Component', () => {
    let comp: CropTypeUpdateComponent;
    let fixture: ComponentFixture<CropTypeUpdateComponent>;
    let service: CropTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmartFarmSolutionTestModule],
        declarations: [CropTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CropTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CropTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CropTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CropType(123);
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
        const entity = new CropType();
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
