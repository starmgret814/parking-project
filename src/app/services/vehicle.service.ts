import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

interface DashboardData {
  cantidadVehiculosEstacionados: number;
  cantidadVehiculosRetirados: number;
  ingresosDelDia: number;
  categoriasDisponibles: number;
  ingresosPorTipoVehiculo: IngresoPorTipoVehiculo[];
}

export interface IngresoPorTipoVehiculo {
  total_recaudado: string;
  tipo_vehiculo: {
    nombre: string;
  };
}

export interface TicketData {
  id: number;
  fecha_entrada: string;
  hora_ingreso: string;
  fecha_salida: string;
  hora_salida: string;
  placa_vehiculo: string;
  pago_total: string;
  tipo_vehiculo_nombre: string;
  tarifa_monto_por_hora: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = 'http://localhost:3001/api/inicio/data'; // URL de la API

  constructor(private http: HttpClient) {}

  private getDashboardData(): Observable<DashboardData> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<{ success: boolean; data: DashboardData }>(this.apiUrl, { headers })
      .pipe(map((res) => res.data));
  }

  getAvailableCategories(): Observable<{ count: number }> {
    return this.getDashboardData().pipe(
      map((data) => ({ count: data.categoriasDisponibles }))
    );
  }

  getTodayIncome(): Observable<{ total: number }> {
    return this.getDashboardData().pipe(
      map((data) => ({ total: data.ingresosDelDia }))
    );
  }

  getParkedVehiclesCount(): Observable<{ count: number }> {
    return this.getDashboardData().pipe(
      map((data) => ({ count: data.cantidadVehiculosEstacionados }))
    );
  }

  getRetiredVehiclesCount(): Observable<{ count: number }> {
    return this.getDashboardData().pipe(
      map((data) => ({ count: data.cantidadVehiculosRetirados }))
    );
  }

  getIngresosPorTipoVehiculo(): Observable<IngresoPorTipoVehiculo[]> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<{
        success: boolean;
        data: { ingresosPorTipoVehiculo: IngresoPorTipoVehiculo[] };
      }>(this.apiUrl, { headers })
      .pipe(map((res) => res.data.ingresosPorTipoVehiculo));
  }

  getTickets(): Observable<TicketData[]> {
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<{ success: boolean; data: { ticketsGenerados: TicketData[] } }>(
        this.apiUrl,
        { headers }
      )
      .pipe(map((res) => res.data.ticketsGenerados));
  }
}
