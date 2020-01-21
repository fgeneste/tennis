import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHoraire } from 'app/shared/model/horaire.model';
import { HoraireService } from './horaire.service';

@Component({
  templateUrl: './horaire-delete-dialog.component.html'
})
export class HoraireDeleteDialogComponent {
  horaire?: IHoraire;

  constructor(protected horaireService: HoraireService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.horaireService.delete(id).subscribe(() => {
      this.eventManager.broadcast('horaireListModification');
      this.activeModal.close();
    });
  }
}
