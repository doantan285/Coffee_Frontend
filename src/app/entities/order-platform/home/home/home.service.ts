import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private getCoffee = 'http://localhost/coffee_backend/order/models/getCoffee10.php';
  private getCakes = 'http://localhost/coffee_backend/order/models/getCakes10.php';
  private getSnack = 'http://localhost/coffee_backend/order/models/getSnack10.php';

  constructor(private http: HttpClient) { }

  get10Coffee(): Observable<any> {
    return this.http.get<any[]>(this.getCoffee, {responseType: 'json'});
  }

  get10Cakes(): Observable<any> {
    return this.http.get<any[]>(this.getCakes, {responseType: 'json'});
  }
  get10Snack(): Observable<any> {
    return this.http.get<any[]>(this.getSnack, {responseType: 'json'});
  }
}
