import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
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

interface TicketData {
  horaIngreso: string;
  horaSalida: string;
  placa: string;
  tipo: string;
  monto: number;
  horaTotal: string;
}

const ELEMENT_DATA: TicketData[] = [
  {
    horaIngreso: '08:00',
    horaSalida: '10:30',
    placa: 'ABC-123',
    tipo: 'Auto',
    monto: 15.0,
    horaTotal: '2h 30min',
  },
  {
    horaIngreso: '09:15',
    horaSalida: '11:00',
    placa: 'XYZ-456',
    tipo: 'Moto',
    monto: 8.0,
    horaTotal: '1h 45min',
  },
  {
    horaIngreso: '09:15',
    horaSalida: '11:00',
    placa: 'XYZ-456',
    tipo: 'Moto',
    monto: 8.0,
    horaTotal: '1h 45min',
  },
  {
    horaIngreso: '08:00',
    horaSalida: '10:30',
    placa: 'ABC-123',
    tipo: 'Auto',
    monto: 15.0,
    horaTotal: '2h 30min',
  },
  {
    horaIngreso: '09:15',
    horaSalida: '11:00',
    placa: 'XYZ-456',
    tipo: 'Moto',
    monto: 8.0,
    horaTotal: '1h 45min',
  },
  {
    horaIngreso: '09:15',
    horaSalida: '11:00',
    placa: 'XYZ-456',
    tipo: 'Moto',
    monto: 8.0,
    horaTotal: '1h 45min',
  },
  {
    horaIngreso: '08:00',
    horaSalida: '10:30',
    placa: 'ABC-123',
    tipo: 'Auto',
    monto: 15.0,
    horaTotal: '2h 30min',
  },
];

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
  ],
})
export class AppGenerateReportComponent {
  readonly date = new FormControl(new Date());
  readonly serializedDate = new FormControl(new Date().toISOString());

  displayedColumns: string[] = [
    'index',
    'horaIngreso',
    'horaSalida',
    'placa',
    'tipo',
    'monto',
    'horaTotal',
  ];

  dataSource = ELEMENT_DATA;
}
