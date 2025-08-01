import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-retired-vehicles',
  templateUrl: './retired-vehicles.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppRetiredVehiclesComponent implements OnInit {
  retiredCount: number | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getTodayRetired().subscribe((res) => {
      this.retiredCount = res.count;
    });
  }
}
