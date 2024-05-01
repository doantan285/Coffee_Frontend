import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ShareService} from "./share/share.service";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import {LayoutModule} from "./layout/layout.module";
import { MatDialogModule } from '@angular/material/dialog';
import { HighchartsChartModule } from 'highcharts-angular';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializerFactory(translate: TranslateService) {
  return () => {
  };
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    HighchartsChartModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem('lang') === 'en' ? 'en': 'vi',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    FormsModule,
    LayoutModule,
  ],
  providers: [ShareService,
    {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    multi: true,
    deps: [TranslateService],
  },],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
