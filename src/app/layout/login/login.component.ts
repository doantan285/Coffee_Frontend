import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  currentLanguage: string;
  hidePassword: boolean = true;
  test: any;
  loginForm: FormGroup = new FormGroup({});

  constructor(private _snackBar: MatSnackBar,
    private fb: FormBuilder,
              private translateService: TranslateService,
              private router: Router,
              private loginService: LoginService) {
    this.currentLanguage = this.translateService.currentLang;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['green-snackbar'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.duration = 2000;
    this._snackBar.open(message, action, config);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  onSubmit(): void {
    const res: any = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.loginService.login(res).subscribe(
      response => {
        if (response.login) {
          localStorage.setItem('email', response.email);
          localStorage.setItem('authToken', response.authToken);
          this.loginService.getUserInfo(response.email).subscribe(
            req =>{
              localStorage.setItem('name', req.userData?.username)
              localStorage.setItem('role', req.userData?.role);
              localStorage.setItem('account_id', req.userData?.account_id);
              if(req.userData?.role === 'employee'){
                this.router.navigate(['/manage/order']);
              }else {
                this.router.navigate(['/manage']);
              }
              this.openSnackBar('Đăng nhập thành công ! ', 'Đóng');
            }
          )
        } else {
          this.openSnackBar('Tài khoản mật khẩu không chính xác ! ', 'Close');
        }
      },
      error => {
        console.log('Lỗi:', error);
      }
    );
  }

  handleLang(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'vi' : 'en';
    this.translateService.use(this.currentLanguage);
  }
}
