import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private getCoffee = 'http://localhost/coffee_backend/manage/models/products/getCoffeeProduct.php'
  private getCake = 'http://localhost/coffee_backend/manage/models/products/getCakeProduct.php'
  private getSnack = 'http://localhost/coffee_backend/manage/models/products/getSnackProduct.php'
  private bookMark = 'http://localhost/coffee_backend/manage/models/products/bookMarkProduct.php'
  private delete = 'http://localhost/coffee_backend/manage/models/products/deleteProduct.php'
  private create = 'http://localhost/coffee_backend/manage/models/products/createProduct.php'
  private search = 'http://localhost/coffee_backend/manage/models/products/searchProduct.php'
  private detailProduct = 'http://localhost/coffee_backend/manage/models/products/getDetailProduct.php'
  private comments = 'http://localhost/coffee_backend/manage/models/products/commentProduct.php'
  private deleteComments = 'http://localhost/coffee_backend/manage/models/products/deleteCommentProduct.php'
  constructor(private http: HttpClient) { }

  searchProduct(data: any): Observable<any>{
    return this.http.post(this.search, data);
  }
  getProductCoffee(): Observable<any> {
    return this.http.get<any[]>(this.getCoffee, {responseType: 'json'});
  }
  getProductCake(): Observable<any> {
    return this.http.get<any[]>(this.getCake, {responseType: 'json'});
  }
  getProductSnack(): Observable<any> {
    return this.http.get<any[]>(this.getSnack, {responseType: 'json'});
  }

  handleBookMark(data: any): Observable<any> {
    return this.http.post(this.bookMark, data);
  }

  deleteProduct(data: any): Observable<any>{
    return this.http.post(this.delete, data);
  }

  createProduct(data: any): Observable<any>{
    return this.http.post(this.create, data)
  }

  getDetailId(id: any): Observable<any> {
    return this.http.post(this.detailProduct , id)
  }

  comment(res: any): Observable<any>{
    return this.http.post(this.comments, res)
  }

  deleteComment(res: any): Observable<any>{
    return this.http.post(this.deleteComments, res)
  }
}
