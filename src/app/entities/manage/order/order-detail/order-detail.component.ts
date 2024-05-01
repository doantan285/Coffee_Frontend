import {Component, Inject, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShareService} from "../../../../share/share.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit{
  products: any
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService,
  ) {
  }

  ngOnInit() {
    console.log(this.data)

    this.products = this.data.product_name.split(',').map((item: any) => {
      const [name, total] = item.trim().split('(');
      return {
        name: name.trim(),
        total: parseInt(total, 10)
      };
    });
    console.log(this.products)
  }

  closeDialog(){
    this.dialogRef.close()
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
