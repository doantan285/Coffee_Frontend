import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderDialogService} from "../../../order-platform/order-dialog/order-dialog.service";

@Component({
  selector: 'app-confirm-creat-order',
  templateUrl: './confirm-creat-order.component.html',
  styleUrls: ['./confirm-creat-order.component.scss']
})
export class ConfirmCreatOrderComponent implements OnInit{
  form!: FormGroup;
  table: any
  totalPrice = 0;
  oldOrder: any
  constructor(
    private orderService: OrderDialogService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ConfirmCreatOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    for (let i = 0; i < this.data.length; i++) {
      this.totalPrice += parseInt(this.data[i].price) * this.data[i].total;
    }
    this.table = localStorage.getItem('table_number')
    this.form = this.fb.group({
      name: [
        '',
      ],
      note: [
        '',
      ]
    })

    const tableNumber = {
      table_number: Number(this.table)
    }
    this.orderService.orderOld(tableNumber).subscribe(
      res =>{
        this.oldOrder = res
        if (this.form) {
          this.form.get('name')?.patchValue(res[0]?.customer_name);
          this.form.get('note')?.patchValue(res[0]?.note);
        }
      }
    )
  }
  submit(){
    const product_name = this.data.map((item: any) => `${item.name}(${item.total})`).join(',');
    const currentTime = new Date();
    const res = {
      customer_name: this.form?.value?.name ?? 'N/A',
      date_order: currentTime,
      is_paid: 0,
      note: this.form?.value?.note ? this.form?.value?.note : this.oldOrder[0]?.note ? this.oldOrder[0]?.note : 'không có ghi chú',
      product_name: this.oldOrder[0]?.product_name ? product_name + ',' + this.oldOrder[0]?.product_name : product_name,
      table_number: this.table,
      total_amount: this.oldOrder[0]?.total_amount ?  this.totalPrice + Number(this.oldOrder[0]?.total_amount): this.totalPrice,
    }

    const inputString = res.product_name;

    const productMap = new Map<string, number>();
    const products = inputString.split(',');
    products.forEach((product: string) => {
      const trimmedProduct = product.trim();
      const [productName, count] = trimmedProduct.split('(');
      const productKey = productName.trim();
      const productCount = parseInt(count.replace(')', '').trim());
      if (productMap.has(productKey)) {
        productMap.set(productKey, productMap.get(productKey)! + productCount);
      } else {
        productMap.set(productKey, productCount);
      }
    });

    let newProductName = '';
    productMap.forEach((count, product) => {
      newProductName += `${product}(${count}),`;
    });
    newProductName = newProductName.slice(0, -1);

    res.product_name = newProductName
    this.orderService.creatOrder(res).subscribe(
     res => {
       this.openSnackBar('Thành công tạo đơn hàng ! ', 'đóng');
       this.close()
       window.history.back()
     },
     error => {
       console.log(error)
       this.openSnackBar('có lỗi xảy ra  ! ', 'đóng');
     }
   )
  }
  close(){
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
