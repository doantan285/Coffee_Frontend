import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderComponent} from "./order/order.component";
import {RevenueComponent} from "./revenue/revenue.component";
import {AccountComponent} from "./account/account.component";
import {OrderDetailComponent} from "./order/order-detail/order-detail.component";
import {UsersComponent} from "./users/users.component";
import {TablesComponent} from "./tables/tables.component";
import {ProductsComponent} from "./products/products.component";
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";
import {AuthGuard} from "../../guards/auth.guard";
import {RevenueGuard} from "../../guards/revenue.guard";
import {EmployOrderComponent} from "./employ-order/employ-order.component";
import {OrderProductComponent} from "./order-product/order-product.component";
import {OverviewComponent} from "./overview/overview.component";



const routes: Routes = [
  {path: '', component: OverviewComponent,canActivate: [RevenueGuard]},
  {path: 'order', component: OrderComponent},
  {path: 'orderDetail/:id', component: OrderDetailComponent},
  {path: 'revenue', component: RevenueComponent ,canActivate: [RevenueGuard]},
  {path: 'account', component: AccountComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'productDetail/:id', component: ProductDetailComponent},
  {path: 'users', component: UsersComponent},
  {path: 'table', component: TablesComponent},
  {path: 'employOrder', component: EmployOrderComponent},
  {path: 'orderProduct', component: OrderProductComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
