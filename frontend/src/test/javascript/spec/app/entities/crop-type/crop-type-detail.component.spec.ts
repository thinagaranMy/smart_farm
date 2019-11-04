import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SmarfarmTestModule } from '../../../test.module';
import { CropTypeDetailComponent } from 'app/entities/crop-type/crop-type-detail.component';
import { CropType } from 'app/shared/model/crop-type.model';

describe('Component Tests', () => {
  describe('CropType Management Detail Component', () => {
    let comp: CropTypeDetailComponent;
    let fixture: ComponentFixture<CropTypeDetailComponent>;
    const route = ({ data: of({ cropType: new CropType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmarfarmTestModule],
        declarations: [CropTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CropTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CropTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cropType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
