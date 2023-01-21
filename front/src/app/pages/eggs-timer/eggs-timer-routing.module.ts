import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EggsTimerComponent } from "./eggs-timer.component";

const routes: Routes = [
  { path: '', component: EggsTimerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EggsTimerRoutingModule { }
