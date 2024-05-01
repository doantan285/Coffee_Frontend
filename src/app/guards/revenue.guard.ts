import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import {AuthenticationService} from "../core/authentication.service";

@Injectable({
  providedIn: 'root',
})
export class RevenueGuard implements CanActivate {
  constructor( private router: Router, ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('role') === 'admin') {
      return true
    } else {
      return this.router.navigate(['/login']);
    }
  }
}
