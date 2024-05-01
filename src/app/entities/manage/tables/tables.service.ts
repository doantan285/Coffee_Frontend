import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private add ='http://localhost/coffee_backend/manage/models/tables/addTable.php';
  private delete ='http://localhost/coffee_backend/manage/models/tables/deleteTable.php';
  private table = 'http://localhost/coffee_backend/manage/models/tables/getTable.php';
  private tableDetail = 'http://localhost/coffee_backend/manage/models/tables/getDetailTable.php';
  private searchTableDetail = 'http://localhost/coffee_backend/manage/models/tables/searchTable.php';

  constructor(private http: HttpClient) { }

  getTable(): Observable<any> {
    return this.http.get(this.table)
  }

  getTableDetail(res: any): Observable<any> {
    return this.http.post(this.tableDetail, res)
  }

  searchTable(res: any): Observable<any> {
    return this.http.post(this.searchTableDetail, res)
  }
  deleteTable(res: any): Observable<any> {
    return this.http.post(this.delete, res)
  }
  addTable(res: any): Observable<any>{
    return this.http.post(this.add, res)
  }
}
