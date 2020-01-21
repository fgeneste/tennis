import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHoraire, Horaire } from 'app/shared/model/horaire.model';
import { HoraireService } from './horaire.service';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation/reservation.service';

@Component({
  selector: 'jhi-horaire-update',
  templateUrl: './horaire-update.component.html'
})
export class HoraireUpdateComponent implements OnInit {
  isSaving = false;

  reservations: IReservation[] = [];

  editForm = this.fb.group({
    id: [],
    jour: [],
    reservation: []
  });

  constructor(
    protected horaireService: HoraireService,
    protected reservationService: ReservationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horaire }) => {
      this.updateForm(horaire);

      this.reservationService
        .query({ filter: 'horaire-is-null' })
        .pipe(
          map((res: HttpResponse<IReservation[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IReservation[]) => {
          if (!horaire.reservation || !horaire.reservation.id) {
            this.reservations = resBody;
          } else {
            this.reservationService
              .find(horaire.reservation.id)
              .pipe(
                map((subRes: HttpResponse<IReservation>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IReservation[]) => {
                this.reservations = concatRes;
              });
          }
        });
    });
  }

  updateForm(horaire: IHoraire): void {
    this.editForm.patchValue({
      id: horaire.id,
      jour: horaire.jour != null ? horaire.jour.format(DATE_TIME_FORMAT) : null,
      reservation: horaire.reservation
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horaire = this.createFromForm();
    if (horaire.id !== undefined) {
      this.subscribeToSaveResponse(this.horaireService.update(horaire));
    } else {
      this.subscribeToSaveResponse(this.horaireService.create(horaire));
    }
  }

  private createFromForm(): IHoraire {
    return {
      ...new Horaire(),
      id: this.editForm.get(['id'])!.value,
      jour: this.editForm.get(['jour'])!.value != null ? moment(this.editForm.get(['jour'])!.value, DATE_TIME_FORMAT) : undefined,
      reservation: this.editForm.get(['reservation'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHoraire>>): void {
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
