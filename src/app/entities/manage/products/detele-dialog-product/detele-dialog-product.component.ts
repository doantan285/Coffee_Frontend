import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductsService} from "../products.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-detele-dialog-product',
  templateUrl: './detele-dialog-product.component.html',
  styleUrls: ['./detele-dialog-product.component.scss']
})
export class DeteleDialogProductComponent implements OnInit{
  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeteleDialogProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService : ProductsService
  ) {}

  ngOnInit() {
  }
  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['green-snackbar'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.duration = 2000;
    this._snackBar.open(message, action, config);
  }

  closeDialog(): void{
    this.dialogRef.close()
  }

  delete(data: any): void{
    if(this.data.detailProduct){
      const res = {
        id: this.data.id
      }
      this.productService.deleteComment(res).subscribe(
        res =>{
          this.closeDialog()
          this.openSnackBar('Xóa bình luận thành công ! ', 'đóng');
        },
        error =>{
          console.log('lỗi delete')
        }
      )

    }else {
      this.productService.deleteProduct(data).subscribe(
        res =>{
          this.closeDialog()
          this.openSnackBar('Xóa sản phẩm thành công ! ', 'đóng');
        },
        error =>{
          console.log('lỗi delete')
        }
      )
    }
  }

}
