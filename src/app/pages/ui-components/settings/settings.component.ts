import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppCompanySettingsComponent } from 'src/app/components/component-settings/company-settings/company-settings.component';

@Component({
  selector: 'app-settings',
  imports: [MatCardModule, AppCompanySettingsComponent],
  templateUrl: './settings.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppAjustesComponent {}
