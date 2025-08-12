import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-role-management-dialog',
  standalone: true,
  templateUrl: './role-management-dialog.component.html',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class RoleManagementDialogComponent {
  showInfoBanner = true;

  roleName: string = '';
  selectedSections: string[] = [];

  availableSections: string[] = [
    'Inicio',
    'Usuarios',
    'Salidas',
    'Registros',
    'Categorías',
    'Reportes',
    'Configuración',
  ];

  constructor(public dialogRef: MatDialogRef<RoleManagementDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  saveRole(): void {
    if (!this.roleName.trim()) return;

    this.dialogRef.close({
      name: this.roleName.trim(),
      permissions: this.selectedSections,
    });
  }

  toggleSection(section: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedSections.push(section);
    } else {
      this.selectedSections = this.selectedSections.filter(
        (s) => s !== section
      );
    }
  }
}
