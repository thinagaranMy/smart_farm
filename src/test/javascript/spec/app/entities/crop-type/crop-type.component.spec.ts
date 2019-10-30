import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmartFarmSolutionTestModule } from '../../../test.module';
import { CropTypeComponent } from 'app/entities/crop-type/crop-type.component';
import { CropTypeService } from 'app/entities/crop-type/crop-type.service';
import { CropType } from 'app/shared/model/crop-type.model';

describe('Component Tests', () => {
  describe('CropType Management Component', () => {
    let comp: CropTypeComponent;
    let fixture: ComponentFixture<CropTypeComponent>;
    let service: CropTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmartFarmSolutionTestModule],
        declarations: [CropTypeComponent],
        providers: []
      })
        .overrideTemplate(CropTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CropTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CropTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CropType(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cropTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
