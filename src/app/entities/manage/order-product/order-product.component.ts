import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EmployOrderService} from "../employ-order/employ-order.service";
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../products/products.service";
import {DeleteAccountComponent} from "../account/delete-account/delete-account.component";
import {ConfirmCreatOrderComponent} from "./confirm-creat-order/confirm-creat-order.component";

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit{
  table_number : any
  dataProducts: any[] = [];
  clearSearchProduct = false;
  dataOldOrder: any;
  noData = false
  orderSuc = false
  loading: boolean = false
  categorySearch = 'coffee'
  constructor(
    private dialog: MatDialog,
    private productService : ProductsService,
    private _snackBar: MatSnackBar,
    private employService : EmployOrderService,
    private activatedRoute: ActivatedRoute
    ) {
    this.activatedRoute.queryParams.subscribe( queryParams =>{
      this.table_number = queryParams
      this.table_number = this.table_number?.table_number
      localStorage.setItem('table_number', this.table_number)
    })
  }

  ngOnInit() {
    this.categoryProduct('coffee')
    this.productService.getOldOrder(this.table_number).subscribe(
      res =>{
        this.dataOldOrder = res[0]
      },
      err =>{
        console.log(err);
      }
    )
  }

  refresh(event: any): void{
    this.categoryProduct(localStorage.getItem('category'))
  }

  clearValueSearch(data: any): void{
    this.categoryProduct(localStorage.getItem('category'))
  }

  updateRow(data: any){
    const dialogRef: MatDialogRef<ConfirmCreatOrderComponent> = this.dialog.open(ConfirmCreatOrderComponent, {
      width: '700px',
      height:'700px',
      data: data,
    });
    dialogRef.afterClosed().subscribe( ()=> {
    })
  }

  getCoffee(){    this.productService.getProductCoffee().subscribe(
      res =>{
        this.dataProducts = res.slice().reverse()
        if(this.dataProducts.length === 0){
          this.noData = true        }
      },
      error =>{
        this.noData = true
        console.log('thất bại')
      }
    )
  }

  getCake(){
    this.productService.getProductCake().subscribe(
      res =>{
        this.dataProducts = res.slice().reverse()
        if(this.dataProducts.length === 0){
          this.noData = true
        }

      },
      error =>{
        console.log('thất bại')

      }
    )
  }
  getSnack(){
    this.productService.getProductSnack().subscribe(
      res =>{
        this.dataProducts = res.slice().reverse()
        if(this.dataProducts.length === 0){
          this.noData = true
        }
      },
      error =>{
        this.noData = true
        console.log('thất bại')

      }
    )
  }

  onSearch(data: any): void{

    this.clearSearchProduct = false
    const search = {
      category: this.categorySearch,
      value: data.searchValue
    }
    this.productService.searchProduct(search).subscribe(
      res =>{
        this.dataProducts = res
        if(res.length === 0){
          this.noData = true
        }
      },err=>{
      }
    )
  }
  categoryProduct(data: any): void{
    this.clearSearchProduct = true
    switch(data) {
      case 'cakes':
        this.categorySearch = 'cakes'
        localStorage.setItem('category', 'cakes')
        this.getCake()
        break;
      case 'snacks':
        this.categorySearch = 'snacks'
        localStorage.setItem('category', 'snacks')
        this.getSnack()
        break;
      case 'coffee':
        this.categorySearch = 'coffee'
        localStorage.setItem('category', 'coffee')
        this.getCoffee()
        break;
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
