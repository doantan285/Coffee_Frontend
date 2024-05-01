import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  private getRevenue = 'http://localhost/coffee_backend/manage/models/revenue/getRevenue.php';
  private searchRevenue = 'http://localhost/coffee_backend/manage/models/revenue/searchRevenue.php'

  constructor(private http: HttpClient) { }

  getRevenues(): Observable<any> {
    return this.http.get<any[]>(this.getRevenue, {responseType: 'json'});
  }
  searchInputRevenue(res: any): Observable<any>{
    return this.http.post(this.searchRevenue, res);
  }

}
