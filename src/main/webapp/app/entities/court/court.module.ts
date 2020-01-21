import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TennisSharedModule } from 'app/shared/shared.module';
import { CourtComponent } from './court.component';
import { CourtDetailComponent } from './court-detail.component';
import { CourtUpdateComponent } from './court-update.component';
import { CourtDeleteDialogComponent } from './court-delete-dialog.component';
import { courtRoute } from './court.route';

@NgModule({
  imports: [TennisSharedModule, RouterModule.forChild(courtRoute)],
  declarations: [CourtComponent, CourtDetailComponent, CourtUpdateComponent, CourtDeleteDialogComponent],
  entryComponents: [CourtDeleteDialogComponent]
})
export class TennisCourtModule {}
