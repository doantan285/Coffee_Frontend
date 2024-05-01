import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit{
  hidePassword: boolean = true;
  currentLanguage: any;
  createAccountForm!: FormGroup;
  fileToUpload: any;
  imageUrl: any;
  missingImg = false
  dataAccount: any[] = []
  constructor(
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private accountService: AccountService,
    private dialogRef: MatDialogRef<AddAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.currentLanguage = localStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.createAccountForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', Validators.required]
    });
    this.getAccount()
    if(this.data?.type){
      this.createAccountForm.get('username')?.patchValue(this.data.username)
      this.createAccountForm.get('password')?.patchValue(this.data.password)
      this.createAccountForm.get('email')?.patchValue(this.data.email)
      this.createAccountForm.get('role')?.patchValue(this.data.role)
      this.imageUrl = this.data.img
    }
  }
  getAccount(): void {
    this.accountService.getAccounts().subscribe(
      res =>{
        this.dataAccount = res
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

  submit(){
    if(this.data?.type){
      const res = {
        account_id: this.data.account_id,
        email: this.createAccountForm.value.email,
        username: this.createAccountForm.value.username,
        password: this.createAccountForm.value.password,
        urlImg: this.imageUrl,
        role: this.createAccountForm.value.role
      }
     this.accountService.editAccount(res).subscribe()
      this.close()
    }else {
      const usernameList = this.dataAccount ? this.dataAccount.map(item => item.username) : [];
      const emailList = this.dataAccount ? this.dataAccount.map(item => item.email) : [];
      if(emailList.includes(this.createAccountForm.value.email)){
        this.openSnackBar('Email đã tồn tại ! ', 'Close');
      }else  if (usernameList.includes(this.createAccountForm.value.username)) {
        this.openSnackBar('Tên tài khoản đã tồn tại ! ', 'Close');
      }else {
        const res = {
          email: this.createAccountForm.value.email,
          username: this.createAccountForm.value.username,
          password: this.createAccountForm.value.password,
          urlImg: this.imageUrl,
          role: this.createAccountForm.value.role
        }
        this.accountService.createAccount(res).subscribe(
          () =>{
            this.close()
            this.openSnackBar('Thêm tài khoản thành công ! ', 'Close');

          }
        )
      }
    }
  }
  close(){
    this.dialogRef.close()
  }

  handleFileInput(event: any): void {
    this.missingImg = false;
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
      let reader = new FileReader();
      reader.onload = (event: any) => {
        if (this.imageUrl) {
          this.imageUrl = event.target.result;
          this.cdr.detectChanges();
        } else {
          this.missingImg = false;
          this.imageUrl = event.target.result;
          this.cdr.detectChanges();
        }
      };
      reader.readAsDataURL(this.fileToUpload);
    }
  }


}
