import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  change = 'http://localhost/coffee_backend/manage/models/login/changePassword.php'

  constructor(private http: HttpClient) {}

  changePassword(res: any): Observable<any>{
    return this.http.post(this.change, res)
  }
}
