import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule } from "ng-zorro-antd/modal";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzInputModule } from "ng-zorro-antd/input";


@NgModule({
  declarations: [
    CarsComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    NzButtonModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzTableModule,
    NzSelectModule,
    NzInputModule
  ]
})
export class CarsModule { }
