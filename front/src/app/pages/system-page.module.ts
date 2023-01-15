import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemPageRoutingModule } from './system-page-routing.module';
import { SystemComponent } from './system.component';
import { DashboardModule } from "./dashboard/dashboard.module";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { IconsProviderModule } from "../icons-provider.module";
import { CarsModule } from "./cars/cars.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    SystemComponent
  ],
  imports: [
    CommonModule,
    SystemPageRoutingModule,
    DashboardModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    CarsModule,
  ]
})
export class SystemPageModule { }