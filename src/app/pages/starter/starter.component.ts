import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppLatestTicketsComponent } from 'src/app/components/component-dashboard/latest-tickets/latest-tickets.component';
import { AppVehicleRevenueComponent } from 'src/app/components/component-dashboard/vehicle-revenue/vehicle-revenue.component';
import { AppRetiredVehiclesComponent } from 'src/app/components/component-dashboard/retired-vehicles/retired-vehicles.component';
import { AppParkedVehiclesCountComponent } from 'src/app/components/component-dashboard/parked-vehicles-count/parked-vehicles-count.component';
import { AppDayIncomeComponent } from 'src/app/components/component-dashboard/day-income/day-income.component';
import { AppAvailableCategoriesComponent } from 'src/app/components/component-dashboard/available-categories/available-categories.component';

@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    AppVehicleRevenueComponent,
    AppLatestTicketsComponent,
    AppRetiredVehiclesComponent,
    AppParkedVehiclesCountComponent,
    AppDayIncomeComponent,
    AppAvailableCategoriesComponent,
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {}
