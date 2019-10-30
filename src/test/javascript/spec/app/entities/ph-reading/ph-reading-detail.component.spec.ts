import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmartFarmSolutionTestModule } from '../../../test.module';
import { PhReadingDetailComponent } from 'app/entities/ph-reading/ph-reading-detail.component';
import { PhReading } from 'app/shared/model/ph-reading.model';

describe('Component Tests', () => {
  describe('PhReading Management Detail Component', () => {
    let comp: PhReadingDetailComponent;
    let fixture: ComponentFixture<PhReadingDetailComponent>;
    const route = ({ data: of({ phReading: new PhReading(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmartFarmSolutionTestModule],
        declarations: [PhReadingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PhReadingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PhReadingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.phReading).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
