import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor() {}

  getTodayRetired(): Observable<{ count: number }> {
    return of({ count: 12 }); // Simula que hoy salieron 12 vehículos
  }

  getTodayParked(): Observable<{ count: number }> {
    return of({ count: 21 }); // Simula 21 estacionados
  }

  getAvailableCategories(): Observable<{ count: number }> {
    return of({ count: 4 }); // Simula 4 categorías disponibles
  }

  getTodayIncome(): Observable<{ total: number }> {
    return of({ total: 12450 }); // Simula S/. 12,450 de ingresos
  }
}
