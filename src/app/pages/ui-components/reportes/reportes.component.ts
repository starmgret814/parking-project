import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  imports: [MatCardModule],
})
export class AppReportesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
