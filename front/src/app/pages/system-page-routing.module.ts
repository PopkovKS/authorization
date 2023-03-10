import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from "./system.component";
import { AuthGuard } from "../auth.guard";

const routes: Routes = [
  {
    path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'cars', loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule) },
      { path: 'eggs-timer', loadChildren: () => import('./eggs-timer/eggs-timer.module').then(m => m.EggsTimerModule) },
      { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
      { path: 'calc', loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule) }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemPageRoutingModule { }
