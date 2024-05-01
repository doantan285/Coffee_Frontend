import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {ScrollTopComponent} from "./scroll-top/scroll-top.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MatIconModule} from "@angular/material/icon";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    HeaderComponent,
    ScrollTopComponent,
    FooterComponent,
    LoginComponent,
    ChangePasswordComponent
  ],
  exports: [
    HeaderComponent,
    ScrollTopComponent,
    FooterComponent,
    LoginComponent,
    ChangePasswordComponent,


  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    FormsModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatIconModule,
    RouterLinkActive,
    MatMenuModule,
    MatSnackBarModule

  ],
  providers: [
    // ...
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
  ],
})
export class LayoutModule {
}
