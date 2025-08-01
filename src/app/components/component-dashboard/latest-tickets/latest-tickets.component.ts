import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

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
  selector: 'app-latest-tickets',
  imports: [CommonModule, MaterialModule],
  templateUrl: './latest-tickets.component.html',
})
export class AppLatestTicketsComponent {
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
