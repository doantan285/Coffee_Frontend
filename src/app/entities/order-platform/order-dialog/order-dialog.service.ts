import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderDialogService {
  private getProduct = 'http://localhost/coffee_backend/order/models/getProductOrder.php';
  private addOrder = 'http://localhost/coffee_backend/order/models/createOrder.php';
  private getOrderOld =  'http://localhost/coffee_backend/order/models/getOrderOld.php'

  constructor(private http: HttpClient) { }

  getProductOrder(res: any): Observable<any>{
    return this.http.post(this.getProduct, res)
  }

  creatOrder(res: any): Observable<any>{
    return this.http.post(this.addOrder, res)
  }

  orderOld(res: any): Observable<any>{
    return this.http.post(this.getOrderOld, res)
  }
}
