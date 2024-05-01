import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private getOrders = 'http://localhost/coffee_backend/manage/models/orders/getOrder.php';
  private changeStatus = 'http://localhost/coffee_backend/manage/models/orders/changeSatusOrder.php';
  private delete = 'http://localhost/coffee_backend/manage/models/orders/deleteOrders.php';
  private searchOrder = 'http://localhost/coffee_backend/manage/models/orders/searchOrder.php'
  private getDetail = 'http://localhost/coffee_backend/manage/models/orders/getDetailOrders.php'

  constructor(private http: HttpClient) {
  }

  getOrder(): Observable<any> {
    return this.http.get(this.getOrders)
  }

  changeStatusOrder(data: any): Observable<any> {
    return this.http.post(this.changeStatus, data);
  }

  deleteOrders(res: any): Observable<any>{
    return this.http.post(this.delete, res);
  }

  searchOrders(res: any): Observable<any>{
    return this.http.post(this.searchOrder, res);
  }
  getDetailOrders(res: any): Observable<any>{
    return this.http.post(this.getDetail, res);
  }
}
