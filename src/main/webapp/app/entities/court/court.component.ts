import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICourt } from 'app/shared/model/court.model';
import { CourtService } from './court.service';
import { CourtDeleteDialogComponent } from './court-delete-dialog.component';

@Component({
  selector: 'jhi-court',
  templateUrl: './court.component.html'
})
export class CourtComponent implements OnInit, OnDestroy {
  courts?: ICourt[];
  eventSubscriber?: Subscription;

  constructor(protected courtService: CourtService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.courtService.query().subscribe((res: HttpResponse<ICourt[]>) => {
      this.courts = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCourts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICourt): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCourts(): void {
    this.eventSubscriber = this.eventManager.subscribe('courtListModification', () => this.loadAll());
  }

  delete(court: ICourt): void {
    const modalRef = this.modalService.open(CourtDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.court = court;
  }
}
