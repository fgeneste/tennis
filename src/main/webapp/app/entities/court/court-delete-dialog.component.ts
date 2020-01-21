import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICourt } from 'app/shared/model/court.model';
import { CourtService } from './court.service';

@Component({
  templateUrl: './court-delete-dialog.component.html'
})
export class CourtDeleteDialogComponent {
  court?: ICourt;

  constructor(protected courtService: CourtService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.courtService.delete(id).subscribe(() => {
      this.eventManager.broadcast('courtListModification');
      this.activeModal.close();
    });
  }
}
