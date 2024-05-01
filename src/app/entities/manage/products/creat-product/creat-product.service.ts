import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreatProductService {
  editProducts = 'http://localhost/coffee_backend/manage/models/products/editProduct.php'

  constructor(private http: HttpClient) {}
  editProduct(res: any): Observable<any>{
    return this.http.post(this.editProducts, res)
  }

}
