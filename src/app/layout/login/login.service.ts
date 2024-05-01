import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost/coffee_backend/manage/models/login/handle_login.php';
  private getInfo = 'http://localhost/coffee_backend/manage/models/getUserInfo/getUserInfo.php';
  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getUserInfo(email: any): Observable<any> {
    // Thực hiện GET request với tham số truy vấn
    return this.http.get(`${this.getInfo}?email=${email}`);
  }

}
