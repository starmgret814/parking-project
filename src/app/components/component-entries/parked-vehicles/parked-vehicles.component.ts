import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

interface ParkedVehicle {
  plate: string;
  type: string;
  entryTime: Date;
}

@Component({
  selector: 'app-parked-vehicles',
  templateUrl: './parked-vehicles.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppParkedVehiclesComponent implements OnInit {
  parkedVehicles: ParkedVehicle[] = [];
  filteredVehicles: ParkedVehicle[] = [];
  currentTime: Date = new Date();
  searchTerm: string = '';
  elapsedSeconds: number = 0;
  formattedElapsedTime: string = '00:00:00';
  intervalId: any;
  ngOnInit(): void {
    this.parkedVehicles = [
      {
        plate: 'ABC-123',
        type: 'Autos/Camioneta',
        entryTime: new Date('2025-05-30T16:04:33'),
      },
      {
        plate: 'XYZ-789',
        type: 'Moto',
        entryTime: new Date('2025-05-30T15:20:00'),
      },
    ];

    this.filteredVehicles = [...this.parkedVehicles];

    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
    this.startTimer();
  }

  startTimer(): void {
    this.intervalId = setInterval(() => {
      this.elapsedSeconds++;
      this.formattedElapsedTime = this.formatElapsedTime(this.elapsedSeconds);
    }, 1000);
  }

  formatElapsedTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  pad(value: number): string {
    return value.toString().padStart(2, '0');
  }

  calculateAmount(vehicle: ParkedVehicle): number {
    const rate = vehicle.type === 'Moto' ? 2 : 5;
    const elapsedHours =
      (this.currentTime.getTime() - vehicle.entryTime.getTime()) / 3600000000;
    return +(rate * Math.ceil(elapsedHours)).toFixed(2);
  }

  exitVehicle(vehicle: ParkedVehicle): void {
    console.log('Registrar salida:', vehicle);
    // Aquí puedes añadir lógica real de salida
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredVehicles = this.parkedVehicles.filter((vehicle) =>
      vehicle.plate.toLowerCase().includes(term),
    );
  }
}
