import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AccountService} from "../../account/account.service";
import {UsersService} from "../users.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit{
  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService : UsersService
  ) {}

  ngOnInit() {}

  closeDialog(): void{
    this.dialogRef.close()
  }

  delete(data: any): void{
    const res = {
      id: data.ids[0]
    }
    this.userService.delete(res).subscribe(
      ()=>{
        this.closeDialog()
        this.openSnackBar('Xóa thành công ! ', 'Close');

      }
    )
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
