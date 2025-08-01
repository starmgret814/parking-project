import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-parked-vehicles',
  templateUrl: './parked-vehicles-count.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppParkedVehiclesCountComponent implements OnInit {
  parkedCount: number | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getTodayParked().subscribe((res) => {
      this.parkedCount = res.count;
    });
  }
}
