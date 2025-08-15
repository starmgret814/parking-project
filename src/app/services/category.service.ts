import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Category {
  id: number;
  nombre: string;
  estado: boolean;
}

export interface Rate {
  id: number;
  monto_por_hora: string;
  estado: boolean;
  id_turno: number;
  id_tipo_vehiculo: number;
  turno_tarifa: {
    id: number;
    nombre_turno: string;
    vigente_desde: string;
    vigente_hasta: string;
    estado: boolean;
  };
  tipo_vehiculo: {
    id: number;
    nombre: string;
    estado: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl1 = 'http://localhost:3001/api/tipo_vehiculo';
  private apiUrl2 = 'http://localhost:3001/api/tarifa';
  private apiUrl3 = 'http://localhost:3001/api/turno_tarifa';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl1);
  }

  addCategory(category: {
    nombre: string;
    estado: boolean;
  }): Observable<Category> {
    return this.http.post<Category>(this.apiUrl1, category);
  }

  updateCategory(
    categoryId: string,
    category: { nombre: string; estado: boolean }
  ): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl1}/${categoryId}`, category);
  }

  deleteCategory(categoryId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl1}/${categoryId}`);
  }

  getRatesByVehicleType(tipoVehiculoId: number): Observable<Rate[]> {
    return this.http.get<Rate[]>(
      `${this.apiUrl2}/tipo_vehiculo/${tipoVehiculoId}`
    );
  }

  addRates(data: {
    monto_por_hora: number;
    id_turno: number;
    id_tipo_vehiculo: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl2}`, data);
  }

  updateRate(
    rateId: number,
    rateData: {
      monto_por_hora: number;
      id_turno: number;
      id_tipo_vehiculo: number;
    }
  ): Observable<Rate> {
    return this.http.put<Rate>(`${this.apiUrl2}/${rateId}`, rateData);
  }

  getTurnoIds(): Observable<number[]> {
    return this.http
      .get<{ id: number }[]>(this.apiUrl3)
      .pipe(map((turnos) => turnos.map((t) => t.id)));
  }
}
