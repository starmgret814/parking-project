import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppVehiclesExitsComponent } from 'src/app/components/component-exits/vehicles-exits/vehicles-exits.component';
import { AppTodayExitsComponent } from 'src/app/components/component-exits/today-exits/today-exits.component';

@Component({
  selector: 'app-exits',
  imports: [MatCardModule, AppVehiclesExitsComponent, AppTodayExitsComponent],
  templateUrl: './exits.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppExitsComponent {}
