import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  imports: [MatCardModule],
})
export class AppAjustesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
