import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { RoutingService } from '../../../Services/common/routing.service';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent
  ],
  entryComponents: [
    // AddKeyLearningComponent,
    // AddDailyReviewComponent,
    // AddMentorRequestComponent,
    // AddCustomerInterviewComponent,
    // AddMentorNotesComponent,
    // MentorNotesComponent,
    // KeyLearningComponent,
    // DailyReviewComponent,
    // CustomerInterviewComponent,
  ],
  providers: [RoutingService]
})
export class DashboardModule { }
