import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJoueur } from 'app/shared/model/joueur.model';
import { JoueurService } from './joueur.service';

@Component({
  templateUrl: './joueur-delete-dialog.component.html'
})
export class JoueurDeleteDialogComponent {
  joueur?: IJoueur;

  constructor(protected joueurService: JoueurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.joueurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('joueurListModification');
      this.activeModal.close();
    });
  }
}
