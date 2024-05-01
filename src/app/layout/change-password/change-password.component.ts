import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordService} from "./change-password.service";
import {MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  changePassword: FormGroup = new FormGroup({});
  hidePassword: boolean = true;
  hideConfilmPassword: boolean = true
  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private changePasswordService: ChangePasswordService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {}


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConFilmPasswordVisibility(): void {
    this.hideConfilmPassword = !this.hideConfilmPassword;
  }


  ngOnInit() {
    this.changePassword = this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      newPassword: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      conFilmPassword: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  close(){
    this.dialogRef.close()
  }

  onSubmit(): void {
    if (this.changePassword.get('newPassword')?.value !== this.changePassword.get('conFilmPassword')?.value){
      this.openSnackBar('password and re-enter password are not the same', 'Close');
    }
    const res = {
      email: localStorage.getItem('email'),
      password: this.changePassword.get('password')?.value,
      newPassword: this.changePassword.get('newPassword')?.value,
      conFilmPassword: this.changePassword.get('conFilmPassword')?.value
    }
    this.changePasswordService.changePassword(res).subscribe(
      req =>{
        if(req.message === 'changeError'){
          this.openSnackBar('Mật Khẩu Không Đúng!', 'Close');
        }else {
          this.close()
          this.openSnackBar('Password updated successfully', 'Close');
        }
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
