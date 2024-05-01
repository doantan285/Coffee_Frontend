import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutsComponent} from "./abouts/abouts.component";
import {OrderDialogComponent} from "./order-dialog/order-dialog.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)},
  { path: 'about', component: AboutsComponent},
  { path: 'orderDialog', component: OrderDialogComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPlatformRoutingModule { }
