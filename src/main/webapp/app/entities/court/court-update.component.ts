import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICourt, Court } from 'app/shared/model/court.model';
import { CourtService } from './court.service';

@Component({
  selector: 'jhi-court-update',
  templateUrl: './court-update.component.html'
})
export class CourtUpdateComponent implements OnInit {
  isSaving = false;

  courts: ICourt[] = [];

  editForm = this.fb.group({
    id: [],
    numero: [],
    reservation: []
  });

  constructor(protected courtService: CourtService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ court }) => {
      this.updateForm(court);

      this.courtService
        .query()
        .pipe(
          map((res: HttpResponse<ICourt[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICourt[]) => (this.courts = resBody));
    });
  }

  updateForm(court: ICourt): void {
    this.editForm.patchValue({
      id: court.id,
      numero: court.numero,
      reservation: court.reservation
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const court = this.createFromForm();
    if (court.id !== undefined) {
      this.subscribeToSaveResponse(this.courtService.update(court));
    } else {
      this.subscribeToSaveResponse(this.courtService.create(court));
    }
  }

  private createFromForm(): ICourt {
    return {
      ...new Court(),
      id: this.editForm.get(['id'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      reservation: this.editForm.get(['reservation'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourt>>): void {
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

  trackById(index: number, item: ICourt): any {
    return item.id;
  }
}
