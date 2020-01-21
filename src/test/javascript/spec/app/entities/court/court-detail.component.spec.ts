import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TennisTestModule } from '../../../test.module';
import { CourtDetailComponent } from 'app/entities/court/court-detail.component';
import { Court } from 'app/shared/model/court.model';

describe('Component Tests', () => {
  describe('Court Management Detail Component', () => {
    let comp: CourtDetailComponent;
    let fixture: ComponentFixture<CourtDetailComponent>;
    const route = ({ data: of({ court: new Court(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TennisTestModule],
        declarations: [CourtDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CourtDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CourtDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load court on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.court).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
