import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EggsTimerRoutingModule } from './eggs-timer-routing.module';
import { EggsTimerComponent } from './eggs-timer.component';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    EggsTimerComponent
  ],
  imports: [
    CommonModule,
    EggsTimerRoutingModule,
    FormsModule
  ]
})
export class EggsTimerModule { }
