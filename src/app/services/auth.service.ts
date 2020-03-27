import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiEndoint: string;

  constructor(private http: HttpClient) {
    this.apiEndoint = environment.apiEndoint;
  }

  login = (obj: any) => {
    const loginEndpoint = this.apiEndoint + 'user/login';
    return this.http.post(loginEndpoint, obj);
  }

  logout = () => {
    const logoutEndpoint = this.apiEndoint + 'user/logout';
    return this.http.post(logoutEndpoint, {});
  }
}
