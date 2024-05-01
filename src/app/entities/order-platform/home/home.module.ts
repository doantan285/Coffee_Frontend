import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home/home.component";
import {LayoutModule} from "../../../layout/layout.module";
import {MatButtonModule} from "@angular/material/button";
import { ImgDetailComponent } from './home/img-detail/img-detail.component';

@NgModule({
  declarations: [HomeComponent, ImgDetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],


})
export class HomeModule { }
