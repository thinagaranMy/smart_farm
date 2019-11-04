import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmarfarmTestModule } from '../../../test.module';
import { WaterConsumptionDetailComponent } from 'app/entities/water-consumption/water-consumption-detail.component';
import { WaterConsumption } from 'app/shared/model/water-consumption.model';

describe('Component Tests', () => {
  describe('WaterConsumption Management Detail Component', () => {
    let comp: WaterConsumptionDetailComponent;
    let fixture: ComponentFixture<WaterConsumptionDetailComponent>;
    const route = ({ data: of({ waterConsumption: new WaterConsumption(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmarfarmTestModule],
        declarations: [WaterConsumptionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(WaterConsumptionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WaterConsumptionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.waterConsumption).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
