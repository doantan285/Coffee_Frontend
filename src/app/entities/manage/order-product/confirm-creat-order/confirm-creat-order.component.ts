import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderDialogService} from "../../../order-platform/order-dialog/order-dialog.service";
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-confirm-creat-order',
  templateUrl: './confirm-creat-order.component.html',
  styleUrls: ['./confirm-creat-order.component.scss']
})
export class ConfirmCreatOrderComponent implements OnInit{
  form!: FormGroup;
  table: any
  totalPrice = 0;
  oldOrder: any;
  dataUpdateFeature: any
  constructor(
    private productService : ProductsService,
    private orderService: OrderDialogService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<ConfirmCreatOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    const storedData = sessionStorage.getItem('dataUpdateFeature');
    if(storedData){
      this.dataUpdateFeature = JSON.parse(storedData);
    }
    
    
    for (let i = 0; i < this.data.length; i++) {
      this.totalPrice += parseInt(this.data[i].price) * this.data[i].total;
    }
    if(this.dataUpdateFeature && this.dataUpdateFeature.totalPrice){
      this.totalPrice = this.dataUpdateFeature.totalPrice
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

    this.productService.getOldOrder(Number(this.table)).subscribe(
      res =>{
        this.oldOrder = res[0]
        this.oldOrder.product_name = this.convertProductName(this.oldOrder.product_name)
        console.log('oldOrder', res);
        
        if (this.form) {
          this.form.get('name')?.patchValue(res[0]?.customer_name);
          this.form.get('note')?.patchValue(res[0]?.note);
        }
      }
    )
  }


  convertProductName(productName: string) {
    if(productName){
      const productsArray = productName.split(',').map(item => {
        const matches = item.match(/^(.*)\((\d+)\)$/);
        if (matches) {
          return {
            name: matches[1].trim(),
            total: parseInt(matches[2], 10)
          };
        }
        return null;
      }).filter(item => item !== null);
    
      return productsArray;
    }
    return ''
    
  }
  submit(){
    const account_id = localStorage.getItem('account_id')
    const product_name = this.data.map((item: any) => `${item.name}(${item.total})`).join(',');
    const currentTime = new Date();
    const res = {
      discount : this.dataUpdateFeature.discount, 
      account_id: account_id,
      customer_name: this.form?.value?.name ?? 'N/A',
      date_order: currentTime,
      is_paid: 0,
      note: this.form?.value?.note ? this.form?.value?.note : this.oldOrder?.note ? this.oldOrder?.note : 'không có ghi chú',
      product_name: this.oldOrder?.product_name ? product_name + ',' + this.oldOrder?.product_name : product_name,
      table_number: this.table,
      total_amount: this.oldOrder?.total_amount ?  this.totalPrice + Number(this.oldOrder?.total_amount || 0): this.totalPrice,
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
