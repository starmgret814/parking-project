import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReportService, TicketPlano, Report } from 'src/app/services/report.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import {
  ReactiveFormsModule,
  FormControl,
  FormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MaterialModule,
    MatCardModule,
    AppGenerateReportComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
})
export class AppGenerateReportComponent {
   
  readonly fechaInicio = new FormControl<Date | null>(null);
  readonly fechaFin = new FormControl<Date | null>(null);
   
  
   dataLoaded = false;

   displayedColumns: string[] = [
    'index',
    'id',
    'placa_vehiculo',
    'tipo_vehiculo_nombre',
    'fecha_entrada',
    'hora_ingreso',
    'fecha_salida',
    'hora_salida',
    'tarifa_monto_por_hora',
    'pago_total'
  ];

  dataSource: TicketPlano[]=[];


  constructor(private reportService: ReportService,private snackBar: MatSnackBar) {}
  
   // Función para obtener tickets y mostrarlos en la tabla
  obtenerTickets() {
    if (!this.fechaInicio.value || !this.fechaFin.value) {
    this.snackBar.open('Seleccione el rango de fechas', 'Cerrar', {
      duration: 3000, 
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
    return;
  }

    const report: Report = {
      fechaInicio: this.fechaInicio.value.toISOString().split('T')[0],
      fechaFin: this.fechaFin.value.toISOString().split('T')[0],
    };

    this.reportService.getTickets(report).subscribe(tickets => {
      // Mapear directamente lo que devuelve el endpoint
       this.dataSource = tickets.map(t => ({
          id: t.id,
          placa_vehiculo: t.placa_vehiculo,
          fecha_entrada: t.fecha_entrada,
          hora_ingreso: t.hora_ingreso,
          fecha_salida: t.fecha_salida,
          hora_salida: t.hora_salida,
          pago_total: t.pago_total,
          tipo_vehiculo_nombre: t.tipo_vehiculo_nombre,
          tarifa_monto_por_hora: t.tarifa_monto_por_hora,
        }));
         this.dataLoaded = true;
    });
  }

  // Función para exportar a Excel usando las mismas fechas
  exportarTicketsExcel() {
     if (!this.fechaInicio.value || !this.fechaFin.value) {
    this.snackBar.open('Seleccione el rango de fechas', 'Cerrar', {
      duration: 3000, 
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
    return;
  }

    const report: Report = {
      fechaInicio: this.fechaInicio.value.toISOString().split('T')[0],
      fechaFin: this.fechaFin.value.toISOString().split('T')[0],
    };

    this.reportService.exportTickets(report).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte_${report.fechaInicio}_a_${report.fechaFin}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  
}
