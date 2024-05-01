import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authTokenKey = 'authToken';

  constructor() {}

  // Lấy giá trị của authToken từ cookie
  getAuthTokenFromCookie(): string | null {
    const authToken = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${this.authTokenKey}=`));

    return authToken ? authToken.split('=')[1] : null;
  }

  // Lưu giá trị của authToken vào localStorage
  setAuthTokenInLocalStorage(authToken: string): void {
    localStorage.setItem(this.authTokenKey, authToken);
  }

  // Lấy giá trị của authToken từ localStorage
  getAuthTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
}
