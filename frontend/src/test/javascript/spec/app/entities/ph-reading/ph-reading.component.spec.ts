import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SmarfarmTestModule } from '../../../test.module';
import { PhReadingComponent } from 'app/entities/ph-reading/ph-reading.component';
import { PhReadingService } from 'app/entities/ph-reading/ph-reading.service';
import { PhReading } from 'app/shared/model/ph-reading.model';

describe('Component Tests', () => {
  describe('PhReading Management Component', () => {
    let comp: PhReadingComponent;
    let fixture: ComponentFixture<PhReadingComponent>;
    let service: PhReadingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SmarfarmTestModule],
        declarations: [PhReadingComponent],
        providers: []
      })
        .overrideTemplate(PhReadingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PhReadingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PhReadingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PhReading(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.phReadings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
