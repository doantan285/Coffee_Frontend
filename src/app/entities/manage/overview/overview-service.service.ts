import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OverviewServiceService {
  private getChartRev = 'http://localhost/coffee_backend/manage/models/overview/chartRevenue.php'

  constructor(private http: HttpClient) { }
  getChartRevenue(): Observable<any> {
    return this.http.get<any[]>(this.getChartRev, {responseType: 'json'});
  }
}
