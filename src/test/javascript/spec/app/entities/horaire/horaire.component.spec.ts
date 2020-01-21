import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TennisTestModule } from '../../../test.module';
import { HoraireComponent } from 'app/entities/horaire/horaire.component';
import { HoraireService } from 'app/entities/horaire/horaire.service';
import { Horaire } from 'app/shared/model/horaire.model';

describe('Component Tests', () => {
  describe('Horaire Management Component', () => {
    let comp: HoraireComponent;
    let fixture: ComponentFixture<HoraireComponent>;
    let service: HoraireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TennisTestModule],
        declarations: [HoraireComponent],
        providers: []
      })
        .overrideTemplate(HoraireComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HoraireComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HoraireService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Horaire(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.horaires && comp.horaires[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
