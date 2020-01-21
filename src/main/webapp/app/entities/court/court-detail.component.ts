import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourt } from 'app/shared/model/court.model';

@Component({
  selector: 'jhi-court-detail',
  templateUrl: './court-detail.component.html'
})
export class CourtDetailComponent implements OnInit {
  court: ICourt | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ court }) => {
      this.court = court;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
