import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import {MenuComponent} from "./menu/menu.component";
import {LayoutModule} from "../../../layout/layout.module";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    LayoutModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class MenuModule { }
