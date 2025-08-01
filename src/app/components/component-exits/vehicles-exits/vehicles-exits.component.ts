import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles-exits',
  templateUrl: './vehicles-exits.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppVehiclesExitsComponent implements OnInit {
  entriesCount: number | null = null;

  vehiclePlate: string = '';
  vehicleType: string = '';
  vehicleTypes: string[] = ['Moto', 'Auto/Camioneta', 'Camión', 'Bus'];

  constructor() {}

  ngOnInit(): void {}
}
