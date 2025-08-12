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
  name: string = '';
  paternalLastName: string = '';
  maternalLastName: string = '';
  email: string = '';
  role: string = '';
  shift: string = '';

  isChecked: boolean = false;

  roles: string[] = ['Administrador', 'Usuario'];
  shifts: string[] = ['Mañana', 'Tarde', 'Noche'];

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  addUser(
    nameInput: NgModel,
    paternalLastNameInput: NgModel,
    maternalLastNameInput: NgModel,
    emailInput: NgModel,
    roleInput: NgModel,
    shiftInput: NgModel
  ): void {
    const inputs = [
      nameInput,
      paternalLastNameInput,
      maternalLastNameInput,
      emailInput,
      roleInput,
      shiftInput,
    ];

    // Marcar todos como "touched"
    inputs.forEach((input) => input.control.markAsTouched());

    if (inputs.some((input) => input.invalid)) {
      return; // No enviar si hay campos inválidos
    }

    this.dialogRef.close({
      name: this.name,
      paternalLastName: this.paternalLastName,
      maternalLastName: this.maternalLastName,
      email: this.email,
      role: this.role,
      shift: this.shift,
      isChecked: this.isChecked,
    });
  }
}
