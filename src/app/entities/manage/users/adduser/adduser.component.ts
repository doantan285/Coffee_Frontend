import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../account/account.service";
import {TranslateService} from "@ngx-translate/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../users.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit{
  nowDate?: Date;
  currentLanguage: any;
  createUserForm!: FormGroup;
  dataUser: any[] = []
  constructor(
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private userService: UsersService,
    private dialogRef: MatDialogRef<AdduserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.currentLanguage = localStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      time: [''],
      phone: ['', [Validators.required]],
      role: ['', Validators.required]
    });
    this.getAccount()
    if(this.data?.type){
      this.createUserForm.get('phone')?.patchValue(this.data?.data?.phone_number)
      this.createUserForm.get('username')?.patchValue(this.data?.data?.name)
      this.createUserForm.get('email')?.patchValue(this.data?.data?.email)
      this.createUserForm.get('time')?.patchValue(this.data?.data?.hire_date)
      this.createUserForm.get('role')?.patchValue(this.data?.data?.position)
    }
  }

  validateNumber(event: KeyboardEvent) {
    const input = event.key;
    if (isNaN(Number(input))) {
      event.preventDefault();
    }
  }

  getAccount(): void {
    this.userService.getusers().subscribe(
      res =>{
        this.dataUser = res
      }
    )
  }

  submit(){
    if(this.data?.type === 'changeUser'){
      const date = new Date(this.createUserForm.value.time);
      this.nowDate = new Date()
      const res = {
        id: this.data?.data?.user_id,
        email: this.createUserForm.value.email,
        name: this.createUserForm.value.username,
        phone: this.createUserForm.value.phone,
        date: this.createUserForm.value.time ? date.toISOString().slice(0, 10) : this.nowDate.toISOString().slice(0, 10),
        role: this.createUserForm.value.role
      }

      this.userService.editUser(res).subscribe()
      this.openSnackBar('change user successfully', 'Close');
      this.close()
    }else {
      const emailList = this.dataUser ? this.dataUser.map(item => item.email) : [];
      const phoneList = this.dataUser ? this.dataUser.map(item => item.phone_number) : [];
      const date = new Date(this.createUserForm.value.time);
      this.nowDate = new Date()
      if(emailList.includes(this.createUserForm.value.email)){
        this.openSnackBar('email đã tồn tại', 'Close');
      }else if(phoneList.includes(this.createUserForm.value.phone)){
        this.openSnackBar('số điện thoại đã tồn tại!', 'Close');
      }else {
        const res = {
          email: this.createUserForm.value.email,
          name: this.createUserForm.value.username,
          phone: this.createUserForm.value.phone,
          date: this.createUserForm.value.time ? date.toISOString().slice(0, 10) : this.nowDate.toISOString().slice(0, 10),
          role: this.createUserForm.value.role
        }
        this.userService.createUser(res).subscribe(
          () =>{
            this.close()
            this.openSnackBar('thêm tài khoản thành công ! ', 'Close');
          }
        )
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
  close(){
    this.dialogRef.close()
  }
}
