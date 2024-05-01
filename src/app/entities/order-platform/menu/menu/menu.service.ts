import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private search = 'http://localhost/coffee_backend/order/models/menu/searchMenu.php'
  private getCoffee = 'http://localhost/coffee_backend/order/models/menu/getCoffee.php';
  private getCakes = 'http://localhost/coffee_backend/order/models/menu/getCakes.php';
  private getSnacks = 'http://localhost/coffee_backend/order/models/menu/getSnacks.php';

  constructor(private http: HttpClient) {}

  getCafe(): Observable<any> {
    return this.http.get<any[]>(this.getCoffee, {responseType: 'json'});
  }
  getCake(): Observable<any> {
    return this.http.get<any[]>(this.getCakes, {responseType: 'json'});
  }
  getSnack(): Observable<any> {
    return this.http.get<any[]>(this.getSnacks, {responseType: 'json'});
  }

  searchMenu(data: any): Observable<any>{
    return this.http.post(this.search, data);
  }
}
