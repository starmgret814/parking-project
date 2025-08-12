import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppGenerateReportComponent } from 'src/app/components/component-reports/generate-report/generate-report.component';

@Component({
  selector: 'app-reports',
  imports: [MatCardModule, AppGenerateReportComponent],
  templateUrl: './reports.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppReportesComponent {}
