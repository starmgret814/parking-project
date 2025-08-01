import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  templateUrl: './add-user-dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
  ],
})
export class AddUserDialogComponent {
  fullName: string = '';
  email: string = '';
  role: string = '';
  shift: string = '';
  selectedFeatures: string[] = [];

  isChecked: boolean = false;

  roles: string[] = ['Administrador', 'Empleado', 'Supervisor'];
  shifts: string[] = ['Mañana', 'Tarde', 'Noche'];
  availableFeatures: string[] = [
    'Inicio',
    'Registros',
    'Salidas',
    'Categorías',
    'Usuarios',
    'Reportes',
    'Configuración',
  ];

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  addUser(
    fullNameInput: NgModel,
    emailInput: NgModel,
    roleInput: NgModel,
    shiftInput: NgModel,
  ): void {
    const inputs = [fullNameInput, emailInput, roleInput, shiftInput];

    // Marcar todos como "touched"
    inputs.forEach((input) => input.control.markAsTouched());

    if (inputs.some((input) => input.invalid)) {
      return; // No enviar si hay campos inválidos
    }

    this.dialogRef.close({
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      shift: this.shift,
      features: this.selectedFeatures,
      isChecked: this.isChecked,
    });
  }

  toggleFeature(feature: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedFeatures.push(feature);
    } else {
      this.selectedFeatures = this.selectedFeatures.filter(
        (f) => f !== feature,
      );
    }
  }
}
