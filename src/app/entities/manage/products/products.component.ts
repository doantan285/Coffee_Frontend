import {Component, OnInit} from '@angular/core';
import {ProductsService} from "./products.service";
import {Subscription} from "rxjs";
import {ShareService} from "../../../share/share.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreatProductComponent} from "./creat-product/creat-product.component";
import  { DeteleDialogProductComponent} from "./detele-dialog-product/detele-dialog-product.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  private subscriptions = new Subscription();
  loading = true;
  noData = false;
  clearSearchProduct = false;
  columns: string[] = ['position', 'name', 'weight', 'symbol'];
  categorySearch = 'coffee'
  dataProducts: any[] = [];


  constructor(private productService : ProductsService,
              private _snackBar: MatSnackBar,
              private shareService: ShareService,
              private dialog: MatDialog,) {
  }
  ngOnInit(){
    this.categoryProduct('coffee')
  }
  getCoffee(){
    this.noData = false
    this.productService.getProductCoffee().subscribe(
      res =>{
        this.loading = false
        this.dataProducts = res.slice().reverse()
        if(this.dataProducts.length === 0){
          this.noData = true
        }
      },
      error =>{
        // this.noData = true
        this.loading = false
        console.log('thất bại')

      }
    )
  }

  getCake(){
    this.noData = false
    this.productService.getProductCake().subscribe(
      res =>{
        this.loading = false
        this.dataProducts = res.slice().reverse()
        if(this.dataProducts.length === 0){
          this.noData = true
        }

      },
      error =>{
        // this.loading = false
        this.noData = true

        console.log('thất bại')

      }
    )
  }
  getSnack(){
    this.noData = false
    this.productService.getProductSnack().subscribe(
      res =>{
        this.dataProducts = res.slice().reverse()
        if(this.dataProducts.length === 0){
          this.noData = true
        }
        this.loading = false
      },
      error =>{
        this.loading = false
        this.noData = true
        console.log('thất bại')

      }
    )
  }
  onSearch(data: any): void{
    this.noData = false
    this.clearSearchProduct = false
    const search = {
      category: this.categorySearch,
      value: data.searchValue.trim()
    }
    this.productService.searchProduct(search).subscribe(
      res =>{
        this.dataProducts = res
        if(res.length === 0){
          this.noData = true
        }
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

  refresh(event: any): void{
    this.categoryProduct(localStorage.getItem('category'))
  }
  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['green-snackbar'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.duration = 2000;
    this._snackBar.open(message, action, config);
  }
  updateRow(data: any): void{
    switch (data.type){
      case 1:
        const res ={
          category: data.category,
          mark: data.mark,
          id: data.id
        }
        this.productService.handleBookMark(res).subscribe(
          req => {
            this.openSnackBar(localStorage.getItem('lang')=== 'vi'?
              ( data.mark ? 'Đánh dấu thành công !' : 'Bỏ đánh dấu thành công !') :
              ( data.mark ? 'Mark success !' : 'Unmark success !'),
              localStorage.getItem('lang')=== 'vi'?'đóng': 'close');
            this.categoryProduct(res.category)
          },
          error => {
            console.log('lỗi')
          }
        )
        break;
      case  2:
        const ress = {
          id: data.id,
          category: data.category,
        }
        const dialogRe: MatDialogRef<DeteleDialogProductComponent> = this.dialog.open(DeteleDialogProductComponent, {
          width: '300px',
          height:'160px',
          data: ress
        });
        dialogRe.afterClosed().subscribe( ()=> {
          this.categoryProduct(ress.category)
        })
        break;
      case 3:
        const dialogRef: MatDialogRef<CreatProductComponent> =this.dialog.open(CreatProductComponent, {
          width: '1000px',
          height:'580px',
          data: data
        });
        dialogRef.afterClosed().subscribe( ()=> {
          this.categoryProduct(data.data.category)
        })
      break;
      case 4:
        const dialog4: MatDialogRef<CreatProductComponent> =this.dialog.open(CreatProductComponent, {
          width: '1000px',
          height:'580px',
          data: data
        });
        dialog4.afterClosed().subscribe( ()=> {
          this.categoryProduct(localStorage.getItem('category'))
        })
    }
  }
  clearValueSearch(data: any): void{
    console.log(localStorage.getItem('category'))
    this.categoryProduct(localStorage.getItem('category'))
  }
}
