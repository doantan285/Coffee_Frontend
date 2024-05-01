import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesRoutingModule } from './entities-routing.module';
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    EntitiesRoutingModule
  ],

})
export class EntitiesModule { }
