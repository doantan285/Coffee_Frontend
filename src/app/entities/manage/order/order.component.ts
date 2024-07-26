import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {OrderService} from "./order.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditPaidComponent} from "./edit-paid/edit-paid.component";
import {ShareService} from "../../../share/share.service";
import {Subscription} from "rxjs";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import jsPDF from 'jspdf';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";


interface Orders {
  id: number;
  name: string;
  time: number;
  nameCustomer: string;
  note: string;
  total_amount: number;
  paid: boolean
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy{
  private subscriptions = new Subscription();
  loading = false;
  noData = false;
  column = [
    {id: 'id'}, {id: 'name'}, {id: 'time'}, {id: 'nameCustomer'}, {id: 'note'}, {id: 'total_amount'}, {id: 'paid'},
  ]
  dataOrders: Orders[] = []

  constructor(
    private _snackBar: MatSnackBar,
    private shareService: ShareService,
    private orderService: OrderService,
    private dialog: MatDialog,
    private sharedService: ShareService,
    private translate : TranslateService
  ) {}
  ngOnInit() {
    this.getOrders()
  }
  clearValueSearch(): void{
    this.getOrders()
  }


  exportToPdf(orderData: any) {
    const orderExport: any = {
      ORDER_ID: orderData.order_id,
      NAME: orderData.customer_name ? orderData.customer_name  : 'không có dữ liệu',
      TIME_ORDER: orderData.date_order,
      USER_ORDER: orderData.user_name,
      NAME_PRODUCT: orderData.product_name,
      TABLE_NUMBER: orderData.table_number,
      PRICE: `${parseFloat(orderData.total_amount).toLocaleString('vi-VN')} VNĐ`,
    }

    const fontPath = './assets/font/Roboto/Roboto-Light.ttf';
    const doc = new jsPDF();
    doc.addFont(fontPath, 'Arial Unicode MS', 'normal');

    const imagePath = './assets/img/logo.png';
    doc.addImage(imagePath, 'PNG', 90, 0, 30, 30);

    let yPos = 40;

    for (const key in orderExport) {
      if (orderExport.hasOwnProperty(key)) {
        const value: any = orderExport[key];
        if (key === 'ORDER_ID') {
          const textWidth = doc.getStringUnitWidth(`${key}: ${value}`);
          const xPos = (doc.internal.pageSize.width - textWidth) / 2.5 + 4;
          doc.text(`${key}: ${value}`, xPos, yPos);
        } else {
          doc.text(`${key}: ${value}`, 20, yPos);
        }
        doc.setFont('Arial Unicode MS');
        yPos += 10;
      }
    }

    doc.save('bill_Order_' + orderExport.ORDER_ID + '.pdf');
  }

  getOrders(){
    this.loading = true;
    this.orderService.getOrder().subscribe(res =>{
      if (res !== null && res !== undefined) {
        this.dataOrders = res
        this.noData = false
        this.loading = false
        if(res.length === 0){
          this.noData = true
        }
      } else {
        this.loading = false;
        this.noData = true;
      }
    }, error => {
      this.loading = false;
      this.noData = true;
    })
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSearch(data: any): void{
    this.noData = false;
    this.loading = true
    const req = {
      data: data.searchValue
    }
    if(data){
      this.orderService.searchOrders(req).subscribe(
        res =>{
          if(res.length === 0){
            this.dataOrders = []
            this.noData = true;
            this.loading = false
          }else {
            this.dataOrders = res;
            this.loading = false;
          }
        },
        ()=>{
          this.dataOrders = []
          this.loading = false;
          this.noData = true;
        }
      )
    }
  }

  updateRow(event: any): void {
    if(event.error){

      this.openSnackBar(  this.translate.currentLang === 'en' ?
        'Please select an order with the same status to change!'
        :'Vui lòng chọn đơn hàng cùng trạng thái để thay đổi!',
        this.translate.currentLang === 'en' ? 'close': 'đóng');
      this.sharedService.triggerRefresh()
    }else {
      if(event.isDelete){
        const dialogRef: MatDialogRef<EditPaidComponent> = this.dialog.open(EditPaidComponent, {
          width: '300px',
          height:'160px',
          data: event
        });
        dialogRef.afterClosed().subscribe( ()=> {
          this.getOrders()
        })
      } else if(event.isPaid) {
        const dialogRef: MatDialogRef<EditPaidComponent> = this.dialog.open(EditPaidComponent, {
          width: '360px',
          height: '320px',
          data: event
        });
        dialogRef.afterClosed().subscribe(() => {
          this.getOrders()
        })
      } else if(event.isShipping){
          const dialogRef: MatDialogRef<EditPaidComponent> = this.dialog.open(EditPaidComponent, {
            width: '360px',
            height:'320px',
            data: event
          });
          dialogRef.afterClosed().subscribe( ()=> {
            this.getOrders()
          })
      }else if(event.detail){
        const dialogRef: MatDialogRef<OrderDetailComponent> = this.dialog.open(OrderDetailComponent, {
          width: '800px',
          height:'600px',
          data: event
        });
        dialogRef.afterClosed().subscribe( ()=> {
        })
      }else {
        const dialogRef: MatDialogRef<EditPaidComponent> = this.dialog.open(EditPaidComponent, {
          width: '360px',
          height:'320px',
          data: event
        });
        dialogRef.afterClosed().subscribe( ()=> {
          this.getOrders()
        })
      }
    }

  }
  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['green-snackbar'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.duration = 2000;
    this._snackBar.open(message, action, config);
  }

}
