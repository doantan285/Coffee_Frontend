import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployOrderService {
  private table = 'http://localhost/coffee_backend/manage/models/tables/getTable.php';
  constructor(private http: HttpClient) { }

  getTable(): Observable<any> {
    return this.http.get(this.table)
  }
}
