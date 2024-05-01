import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  delete = 'http://localhost/coffee_backend/manage/models/account/deleteAccount.php'
  getAccount = 'http://localhost/coffee_backend/manage/models/account/getAccount.php'
  addAccount = 'http://localhost/coffee_backend/manage/models/account/creatAccount.php'
  search = 'http://localhost/coffee_backend/manage/models/account/searchAccount.php'
  edit = 'http://localhost/coffee_backend/manage/models/account/editAccount.php'

  constructor(private http: HttpClient) {}
  getAccounts(): Observable<any>{
    return this.http.get(this.getAccount)
  }

  deleteAccount(res: any): Observable<any>{
    return this.http.post(this.delete, res)
  }

  createAccount(res: any): Observable<any>{
    return this.http.post(this.addAccount, res)
  }

  searchAccount(res: any): Observable<any>{
    return this.http.post(this.search, res)
  }

  editAccount(res: any): Observable<any>{
    return this.http.post(this.edit, res)
  }
}
