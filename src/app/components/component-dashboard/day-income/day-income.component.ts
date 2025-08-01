import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-day-income',
  templateUrl: './day-income.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  encapsulation: ViewEncapsulation.None,
})
export class AppDayIncomeComponent implements OnInit {
  totalIncome: number | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getTodayIncome().subscribe((res) => {
      this.totalIncome = res.total;
    });
  }
}
