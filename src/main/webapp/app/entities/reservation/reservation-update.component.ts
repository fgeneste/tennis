import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IReservation, Reservation } from 'app/shared/model/reservation.model';
import { ReservationService } from './reservation.service';
import { ICourt } from 'app/shared/model/court.model';
import { CourtService } from 'app/entities/court/court.service';
import { IJoueur } from 'app/shared/model/joueur.model';
import { JoueurService } from 'app/entities/joueur/joueur.service';
import { IHoraire } from 'app/shared/model/horaire.model';
import { HoraireService } from 'app/entities/horaire/horaire.service';

type SelectableEntity = ICourt | IJoueur | IHoraire;

@Component({
  selector: 'jhi-reservation-update',
  templateUrl: './reservation-update.component.html'
})
export class ReservationUpdateComponent implements OnInit {
  isSaving = false;

  courts: ICourt[] = [];

  joueurs: IJoueur[] = [];

  horaires: IHoraire[] = [];

  editForm = this.fb.group({
    id: [],
    court: [],
    joueur: [],
    horaire: []
  });

  constructor(
    protected reservationService: ReservationService,
    protected courtService: CourtService,
    protected joueurService: JoueurService,
    protected horaireService: HoraireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reservation }) => {
      this.updateForm(reservation);

      this.courtService
        .query({ filter: 'reservation-is-null' })
        .pipe(
          map((res: HttpResponse<ICourt[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICourt[]) => {
          if (!reservation.court || !reservation.court.id) {
            this.courts = resBody;
          } else {
            this.courtService
              .find(reservation.court.id)
              .pipe(
                map((subRes: HttpResponse<ICourt>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICourt[]) => {
                this.courts = concatRes;
              });
          }
        });

      this.joueurService
        .query({ filter: 'reservation-is-null' })
        .pipe(
          map((res: HttpResponse<IJoueur[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IJoueur[]) => {
          if (!reservation.joueur || !reservation.joueur.id) {
            this.joueurs = resBody;
          } else {
            this.joueurService
              .find(reservation.joueur.id)
              .pipe(
                map((subRes: HttpResponse<IJoueur>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IJoueur[]) => {
                this.joueurs = concatRes;
              });
          }
        });

      this.horaireService
        .query({ filter: 'reservation-is-null' })
        .pipe(
          map((res: HttpResponse<IHoraire[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IHoraire[]) => {
          if (!reservation.horaire || !reservation.horaire.id) {
            this.horaires = resBody;
          } else {
            this.horaireService
              .find(reservation.horaire.id)
              .pipe(
                map((subRes: HttpResponse<IHoraire>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IHoraire[]) => {
                this.horaires = concatRes;
              });
          }
        });
    });
  }

  updateForm(reservation: IReservation): void {
    this.editForm.patchValue({
      id: reservation.id,
      court: reservation.court,
      joueur: reservation.joueur,
      horaire: reservation.horaire
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reservation = this.createFromForm();
    if (reservation.id !== undefined) {
      this.subscribeToSaveResponse(this.reservationService.update(reservation));
    } else {
      this.subscribeToSaveResponse(this.reservationService.create(reservation));
    }
  }

  private createFromForm(): IReservation {
    return {
      ...new Reservation(),
      id: this.editForm.get(['id'])!.value,
      court: this.editForm.get(['court'])!.value,
      joueur: this.editForm.get(['joueur'])!.value,
      horaire: this.editForm.get(['horaire'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservation>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
