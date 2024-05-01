import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./order-platform/order-platform.module').then(m => m.OrderPlatformModule)},
  { path: 'manage', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule),canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
