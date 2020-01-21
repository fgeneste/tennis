import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TennisTestModule } from '../../../test.module';
import { HoraireDetailComponent } from 'app/entities/horaire/horaire-detail.component';
import { Horaire } from 'app/shared/model/horaire.model';

describe('Component Tests', () => {
  describe('Horaire Management Detail Component', () => {
    let comp: HoraireDetailComponent;
    let fixture: ComponentFixture<HoraireDetailComponent>;
    const route = ({ data: of({ horaire: new Horaire(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TennisTestModule],
        declarations: [HoraireDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HoraireDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HoraireDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load horaire on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.horaire).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
