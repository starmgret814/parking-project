import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VentasService {
  constructor() {}

  getVentasHoy(): Observable<{ total: number; variacion: number }> {
    // Simula datos desde backend con 0.5s de retardo
    return of({ total: 12450, variacion: 9 });
  }
}
