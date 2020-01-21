import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TennisTestModule } from '../../../test.module';
import { HoraireUpdateComponent } from 'app/entities/horaire/horaire-update.component';
import { HoraireService } from 'app/entities/horaire/horaire.service';
import { Horaire } from 'app/shared/model/horaire.model';

describe('Component Tests', () => {
  describe('Horaire Management Update Component', () => {
    let comp: HoraireUpdateComponent;
    let fixture: ComponentFixture<HoraireUpdateComponent>;
    let service: HoraireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TennisTestModule],
        declarations: [HoraireUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HoraireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HoraireUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HoraireService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Horaire(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Horaire();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
