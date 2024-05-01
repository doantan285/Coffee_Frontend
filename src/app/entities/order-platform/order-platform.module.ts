import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderPlatformRoutingModule } from './order-platform-routing.module';
import { LayoutModule} from "../../layout/layout.module";
import { ReactiveFormsModule } from '@angular/forms'
import {AboutsComponent} from "./abouts/abouts.component";
import {OrderDialogComponent} from "./order-dialog/order-dialog.component";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    OrderDialogComponent,
    AboutsComponent,
  ],
  imports: [
    CommonModule,
    OrderPlatformRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    TranslateModule,
    MatInputModule,
    MatButtonModule,

  ]
})
export class OrderPlatformModule {}
