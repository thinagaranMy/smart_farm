import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmartFarmSolutionTestModule } from '../../../test.module';
import { WaterConsumptionComponent } from 'app/entities/water-consumption/water-consumption.component';
import { WaterConsumptionService } from 'app/entities/water-consumption/water-consumption.service';
import { WaterConsumption } from 'app/shared/model/water-consumption.model';

describe('Component Tests', () => {
  describe('WaterConsumption Management Component', () => {
    let comp: WaterConsumptionComponent;
    let fixture: ComponentFixture<WaterConsumptionComponent>;
    let service: WaterConsumptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmartFarmSolutionTestModule],
        declarations: [WaterConsumptionComponent],
        providers: []
      })
        .overrideTemplate(WaterConsumptionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WaterConsumptionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WaterConsumptionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new WaterConsumption(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.waterConsumptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
