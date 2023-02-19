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
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { PaginationComponent } from './pagination/pagination.component';
import { ImageComponent } from './image/image.component';


@NgModule({
  declarations: [
    CarsComponent,
    PaginationComponent,
    ImageComponent
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
        NzInputModule,
        NzPopconfirmModule,
        NzCheckboxModule,
        NzPaginationModule
    ]
})
export class CarsModule { }
