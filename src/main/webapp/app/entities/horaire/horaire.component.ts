import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHoraire } from 'app/shared/model/horaire.model';
import { HoraireService } from './horaire.service';
import { HoraireDeleteDialogComponent } from './horaire-delete-dialog.component';

@Component({
  selector: 'jhi-horaire',
  templateUrl: './horaire.component.html'
})
export class HoraireComponent implements OnInit, OnDestroy {
  horaires?: IHoraire[];
  eventSubscriber?: Subscription;

  constructor(protected horaireService: HoraireService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.horaireService.query().subscribe((res: HttpResponse<IHoraire[]>) => {
      this.horaires = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHoraires();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHoraire): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHoraires(): void {
    this.eventSubscriber = this.eventManager.subscribe('horaireListModification', () => this.loadAll());
  }

  delete(horaire: IHoraire): void {
    const modalRef = this.modalService.open(HoraireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.horaire = horaire;
  }
}
