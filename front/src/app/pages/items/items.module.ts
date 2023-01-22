import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { NzGridModule } from "ng-zorro-antd/grid";
import { ItemComponent } from './item/item.component';
import { NzMenuModule } from "ng-zorro-antd/menu";


@NgModule({
  declarations: [
    ItemsComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    NzGridModule,
    NzMenuModule
  ]
})
export class ItemsModule { }
