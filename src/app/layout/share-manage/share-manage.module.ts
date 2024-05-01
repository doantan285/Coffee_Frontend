import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShareManageComponent} from "./share-manage.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {ManageModule} from "../../entities/manage/manage.module";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {TableModule} from "../table/table.module";



@NgModule({
  declarations: [ShareManageComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
    MatMenuModule,
    MatInputModule,
    FormsModule,
    TranslateModule,
    MatButtonModule,
    TableModule,
  ],
  exports:[
    ShareManageComponent
  ]
})
export class ShareManageModule { }
