import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthErrorInterceptor } from '../auth/auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private authService: AuthService) {}

  /**
   * Verifica si el usuario tiene permiso para una función específica.
   * Si tiene la función "Todas", tiene acceso a todo.
   */
  tienePermiso(funcion: string): boolean {
    const funciones = this.authService
      .getFunciones()
      .map((f) => f.toLowerCase().trim());

    return (
      funciones.includes('todas') ||
      funciones.includes(funcion.toLowerCase().trim())
    );
  }

  /**
   * Devuelve todas las funciones (permisos) disponibles del usuario actual.
   */
  getPermisos(): string[] {
    return this.authService.getFunciones();
  }
}
