import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppVehiclesEntriesComponent } from 'src/app/components/component-entries/vehicles-entries/vehicles-entries.component';
import { AppParkedVehiclesComponent } from 'src/app/components/component-entries/parked-vehicles/parked-vehicles.component';

@Component({
  selector: 'app-entries',
  imports: [
    MatCardModule,
    AppVehiclesEntriesComponent,
    AppParkedVehiclesComponent,
  ],
  templateUrl: './entries.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppEntriesComponent {}
