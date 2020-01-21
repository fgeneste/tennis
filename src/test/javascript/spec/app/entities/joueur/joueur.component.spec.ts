import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TennisTestModule } from '../../../test.module';
import { JoueurComponent } from 'app/entities/joueur/joueur.component';
import { JoueurService } from 'app/entities/joueur/joueur.service';
import { Joueur } from 'app/shared/model/joueur.model';

describe('Component Tests', () => {
  describe('Joueur Management Component', () => {
    let comp: JoueurComponent;
    let fixture: ComponentFixture<JoueurComponent>;
    let service: JoueurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TennisTestModule],
        declarations: [JoueurComponent],
        providers: []
      })
        .overrideTemplate(JoueurComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JoueurComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JoueurService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Joueur(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.joueurs && comp.joueurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
