import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductsService} from "../../products/products.service";
import {AccountService} from "../account.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-account',

  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private accountService : AccountService
  ) {}

  ngOnInit() {}

  closeDialog(): void{
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

  delete(data: any): void{
    const res = {
      id: data.ids[0]
    }
    this.accountService.deleteAccount(res).subscribe(
      ()=>{
        this.openSnackBar('Xóa tài khoản thành công ! ', 'Close');
        this.closeDialog()

      }
    )
  }

}
