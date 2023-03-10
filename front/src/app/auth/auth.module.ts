import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { IconsProviderModule } from "../icons-provider.module";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzFormModule } from "ng-zorro-antd/form";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzGridModule,
    NzFormModule

  ]
})
export class AuthModule { }
