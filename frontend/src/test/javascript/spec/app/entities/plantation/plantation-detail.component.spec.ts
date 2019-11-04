import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmarfarmTestModule } from '../../../test.module';
import { PlantationDetailComponent } from 'app/entities/plantation/plantation-detail.component';
import { Plantation } from 'app/shared/model/plantation.model';

describe('Component Tests', () => {
  describe('Plantation Management Detail Component', () => {
    let comp: PlantationDetailComponent;
    let fixture: ComponentFixture<PlantationDetailComponent>;
    const route = ({ data: of({ plantation: new Plantation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmarfarmTestModule],
        declarations: [PlantationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlantationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlantationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.plantation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
