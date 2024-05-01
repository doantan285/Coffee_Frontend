import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ManageRoutingModule } from './manage-routing.module';
import {OrderComponent} from "./order/order.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RevenueComponent} from "./revenue/revenue.component";
import {AccountComponent} from "./account/account.component";
import {LayoutModule} from "../../layout/layout.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {EditPaidComponent} from "./order/edit-paid/edit-paid.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {OrderDetailComponent} from "./order/order-detail/order-detail.component";
import {UsersComponent} from "./users/users.component";
import {TablesComponent} from "./tables/tables.component";
import {ProductsComponent} from "./products/products.component";
import {CreatProductComponent} from "./products/creat-product/creat-product.component";
import {DeteleDialogProductComponent} from "./products/detele-dialog-product/detele-dialog-product.component";
import {MatSelectModule} from "@angular/material/select";
import {ProductDetailComponent} from "./products/product-detail/product-detail.component";
import {AddAccountComponent} from "./account/add-account/add-account.component";
import {MatIconModule} from "@angular/material/icon";
import {DeleteAccountComponent} from "./account/delete-account/delete-account.component";
import {AdduserComponent} from "./users/adduser/adduser.component";
import {DeleteUserComponent} from "./users/delete-user/delete-user.component";
import {DetailTableComponent} from "./tables/detail-table/detail-table.component";
import {DeleteTableComponent} from "./tables/delete-table/delete-table.component";
import {EmployOrderComponent} from "./employ-order/employ-order.component";
import {OrderProductComponent} from "./order-product/order-product.component";
import {ShareManageModule} from "../../layout/share-manage/share-manage.module";
import { ConfirmCreatOrderComponent } from './order-product/confirm-creat-order/confirm-creat-order.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  declarations: [
    EditPaidComponent,
    OrderDetailComponent,
    OrderComponent,
    RevenueComponent,
    AccountComponent,
    UsersComponent,
    TablesComponent,
    ProductsComponent,
    CreatProductComponent,
    DeteleDialogProductComponent,
    ProductDetailComponent,
    AddAccountComponent,
    DeleteAccountComponent,
    AdduserComponent,
    DeleteUserComponent,
    DetailTableComponent,
    DeleteTableComponent,
    EmployOrderComponent,
    OrderProductComponent,
    ConfirmCreatOrderComponent,
    OverviewComponent

  ],
  imports: [
    MatSnackBarModule,
    CommonModule,
    ManageRoutingModule,
    TranslateModule,
    MatSidenavModule,
    LayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule,
    ShareManageModule

  ]
})
export class ManageModule { }
