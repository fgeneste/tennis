import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IJoueur, Joueur } from 'app/shared/model/joueur.model';
import { JoueurService } from './joueur.service';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation/reservation.service';

@Component({
  selector: 'jhi-joueur-update',
  templateUrl: './joueur-update.component.html'
})
export class JoueurUpdateComponent implements OnInit {
  isSaving = false;

  reservations: IReservation[] = [];

  editForm = this.fb.group({
    id: [],
    prenom: [],
    nom: [],
    login: [],
    reservation: []
  });

  constructor(
    protected joueurService: JoueurService,
    protected reservationService: ReservationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ joueur }) => {
      this.updateForm(joueur);

      this.reservationService
        .query()
        .pipe(
          map((res: HttpResponse<IReservation[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IReservation[]) => (this.reservations = resBody));
    });
  }

  updateForm(joueur: IJoueur): void {
    this.editForm.patchValue({
      id: joueur.id,
      prenom: joueur.prenom,
      nom: joueur.nom,
      login: joueur.login,
      reservation: joueur.reservation
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const joueur = this.createFromForm();
    if (joueur.id !== undefined) {
      this.subscribeToSaveResponse(this.joueurService.update(joueur));
    } else {
      this.subscribeToSaveResponse(this.joueurService.create(joueur));
    }
  }

  private createFromForm(): IJoueur {
    return {
      ...new Joueur(),
      id: this.editForm.get(['id'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      login: this.editForm.get(['login'])!.value,
      reservation: this.editForm.get(['reservation'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJoueur>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IReservation): any {
    return item.id;
  }
}
