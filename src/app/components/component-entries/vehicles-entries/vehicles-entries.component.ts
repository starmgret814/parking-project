import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles-entries',
  templateUrl: './vehicles-entries.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppVehiclesEntriesComponent implements OnInit {
  entriesCount: number | null = null;

  vehiclePlate: string = '';
  vehicleType: string = '';
  vehicleRate: number | null = null;
  vehicleTypes: string[] = ['Moto', 'Auto/Camioneta', 'Camión', 'Bus'];

  constructor() {}

  ngOnInit(): void {}
}
