import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IJoueur } from 'app/shared/model/joueur.model';
import { JoueurService } from './joueur.service';
import { JoueurDeleteDialogComponent } from './joueur-delete-dialog.component';

@Component({
  selector: 'jhi-joueur',
  templateUrl: './joueur.component.html'
})
export class JoueurComponent implements OnInit, OnDestroy {
  joueurs?: IJoueur[];
  eventSubscriber?: Subscription;

  constructor(protected joueurService: JoueurService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.joueurService.query().subscribe((res: HttpResponse<IJoueur[]>) => {
      this.joueurs = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInJoueurs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IJoueur): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInJoueurs(): void {
    this.eventSubscriber = this.eventManager.subscribe('joueurListModification', () => this.loadAll());
  }

  delete(joueur: IJoueur): void {
    const modalRef = this.modalService.open(JoueurDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.joueur = joueur;
  }
}
