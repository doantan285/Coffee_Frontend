import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  getUsers = 'http://localhost/coffee_backend/manage/models/users/getUsers.php'
  deleteUser = 'http://localhost/coffee_backend/manage/models/users/deleteUsers.php'
  searchUser = 'http://localhost/coffee_backend/manage/models/users/searchUser.php'

  edit= 'http://localhost/coffee_backend/manage/models/users/editUser.php'
  addUser = 'http://localhost/coffee_backend/manage/models/users/addUser.php'

  constructor(private http: HttpClient) {}

  search(res: any): Observable<any>{
    return this.http.post(this.searchUser, res)
  }
  getusers(): Observable<any>{
    return this.http.get(this.getUsers)
  }

  delete(res: any): Observable<any>{
    return this.http.post(this.deleteUser, res)
  }

  editUser(res: any): Observable<any>{
    return this.http.post(this.edit, res)
  }

  createUser(res: any): Observable<any>{
    return this.http.post(this.addUser, res)
  }

}
