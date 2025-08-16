import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Report {
  fechaInicio: string;
  fechaFin: string;
 
}

export interface TicketPlano {
  id: number;
  fecha_entrada: string;
  hora_ingreso: string;
  fecha_salida: string | null;
  hora_salida: string | null;
  placa_vehiculo: string;
  pago_total: string;
  tipo_vehiculo_nombre: string;
  tarifa_monto_por_hora: string;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiExportExcel = 'http://localhost:3001/api/reporte';
  private apiPreview= 'http://localhost:3001/api/reporte/preview';

  constructor(private http: HttpClient) {}
  
  getTickets(report: Report): Observable<TicketPlano[]> {
    return this.http.post<{ ticketsPlanos: TicketPlano[] }>(this.apiPreview, report)
      .pipe(map(response => response.ticketsPlanos));
  }


  exportTickets(report: Report): Observable<Blob> {
    return this.http.post(this.apiExportExcel, report, { responseType: 'blob' });
  }
  
}
