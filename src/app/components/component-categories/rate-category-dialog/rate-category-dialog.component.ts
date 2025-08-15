import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

export interface TarifaSimplificada {
  id_tarifa: number;
  id_turno: number;
  monto_por_hora: number;
  nombre_turno: string;
}

export interface RateDialogData {
  id_tipo_vehiculo: number;
  nombreTipoVehiculo: string;
  tarifas: TarifaSimplificada[];
}

@Component({
  selector: 'app-rate-category-dialog',
  standalone: true,
  templateUrl: './rate-category-dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
})
export class RateEditDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef<RateEditDialogComponent>);
  data = inject<RateDialogData>(MAT_DIALOG_DATA);

  tarifas: TarifaSimplificada[] = [];
  nombreTipoVehiculo: string = '';
  id_tipo_vehiculo: number = 0;

  ngOnInit(): void {
    this.id_tipo_vehiculo = this.data.id_tipo_vehiculo;
    this.nombreTipoVehiculo = this.data.nombreTipoVehiculo;
    this.tarifas = this.data.tarifas.map((t) => ({
      id_tarifa: t.id_tarifa,
      id_turno: t.id_turno,
      monto_por_hora: t.monto_por_hora,
      nombre_turno: t.nombre_turno,
    }));
  }

  close(): void {
    this.dialogRef.close();
  }

  saveRates(): void {
    for (const t of this.tarifas) {
      if (t.monto_por_hora < 0) {
        return;
      }
    }

    this.dialogRef.close({
      id_tipo_vehiculo: this.id_tipo_vehiculo,
      tarifas: this.tarifas.map((t) => ({
        id_tarifa: t.id_tarifa,
        id_turno: t.id_turno,
        monto_por_hora: t.monto_por_hora,
        nombre_turno: t.nombre_turno,
      })),
    });
  }
}
