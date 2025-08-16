import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Rol {
  id: number;
  nombre: string;
  estado: boolean;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido_p: string;
  apellido_m: string;
  correo: string;
  token_sesion: string;
  turno: string;
  estado: boolean;
  id_rol: number;
  rol: Rol;
}

export interface CrearUsuario {
  nombre: string;
  apellido_p: string;
  apellido_m: string;
  correo: string;
  contrasena: string;
  token_sesion: string;
  turno: string;
  estado: number;
  id_rol: number;
}

export interface ActualizarUsuario {
  nombre: string;
  apellido_p: string;
  apellido_m: string;
  correo: string;
  contrasena: string;
  token_sesion: string;
  turno: string;
  estado: boolean;
  id_rol: number;
}

export interface Funcion {
  id: number;
  nombre: string;
  activo: boolean;
}

export interface ActualizarFuncion {
  nombre: string;
  activo: boolean;
  estado: boolean;
  id_rol: number;
}

export interface ApiResponseUsuario {
  data: Usuario[];
}

export interface ApiResponseRol {
  data: Rol[];
}

export interface ApiResponseFuncion {
  data: Funcion[];
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrlUsuario = 'http://localhost:3001/api/usuario';
  private apiUrlFuncionesUsuario = 'http://localhost:3001/api/funcion/rol/2';
  private apiUrlFuncion = 'http://localhost:3001/api/funcion';
  private apiUrlRol = 'http://localhost:3001/api/rol';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<ApiResponseUsuario>(this.apiUrlUsuario)
      .pipe(map((response) => response.data));
  }

  addUsuario(usuario: CrearUsuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrlUsuario, usuario);
  }

  updateUsuario(id: number, usuario: ActualizarUsuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrlUsuario}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlUsuario}/${id}`);
  }

  getRol(): Observable<Rol[]> {
    return this.http
      .get<ApiResponseRol>(this.apiUrlRol)
      .pipe(map((response) => response.data as Rol[]));
  }

  getFuncionesUsuario(): Observable<Funcion[]> {
    return this.http
      .get<ApiResponseFuncion>(this.apiUrlFuncionesUsuario)
      .pipe(map((response) => response.data));
  }

  updateFuncion(id: number, funcion: ActualizarFuncion): Observable<Funcion> {
    return this.http.put<Funcion>(`${this.apiUrlFuncion}/${id}`, funcion);
  }
}
