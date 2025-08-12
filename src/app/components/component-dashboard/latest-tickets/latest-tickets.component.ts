import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { VehicleService, TicketData } from 'src/app/services/vehicle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-tickets',
  imports: [CommonModule, MaterialModule],
  templateUrl: './latest-tickets.component.html',
  styleUrls: ['./latest-tickets.component.scss'],
})
export class AppLatestTicketsComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'hora_ingreso',
    'hora_salida',
    'placa_vehiculo',
    'tipo_vehiculo_nombre',
    'pago_total',
  ];

  dataSource: TicketData[] = [];

  constructor(private vehicleService: VehicleService, private router: Router) {}

  ngOnInit() {
    this.vehicleService.getTickets().subscribe({
      next: (tickets) => {
        this.dataSource = tickets;
      },
      error: (err) => {
        console.error('Error al cargar tickets', err);
      },
    });
  }

  onRowClick(row: TicketData) {
    if (!row.hora_salida) {
      this.router.navigate(['/ui-components/salidas']);
    }
  }
}
