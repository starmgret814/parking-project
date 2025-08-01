import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://172.17.29.179:3001/api';

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, credentials);
  }
}
