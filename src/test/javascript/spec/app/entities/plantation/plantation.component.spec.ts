import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmartFarmSolutionTestModule } from '../../../test.module';
import { PlantationComponent } from 'app/entities/plantation/plantation.component';
import { PlantationService } from 'app/entities/plantation/plantation.service';
import { Plantation } from 'app/shared/model/plantation.model';

describe('Component Tests', () => {
  describe('Plantation Management Component', () => {
    let comp: PlantationComponent;
    let fixture: ComponentFixture<PlantationComponent>;
    let service: PlantationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmartFarmSolutionTestModule],
        declarations: [PlantationComponent],
        providers: []
      })
        .overrideTemplate(PlantationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlantationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlantationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Plantation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.plantations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
