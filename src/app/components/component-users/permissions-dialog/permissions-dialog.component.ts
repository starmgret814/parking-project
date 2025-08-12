import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppUsersComponent } from 'src/app/pages/ui-components/users/users.component';

@Component({
  selector: 'app-permissions-dialog',
  standalone: true,
  templateUrl: './permissions-dialog.component.html',
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
    AppUsersComponent,
  ],
})
export class PermissionsDialogComponent {
  showInfoBanner = true;

  selectedSections: string[] = [];

  availableSections: string[] = [
    'Inicio',
    'Usuarios',
    'Salidas',
    'Registros',
    'Categorias',
    'Reportes',
    'Configuración',
  ];

  constructor(
    public dialogRef: MatDialogRef<PermissionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  savePermissions(): void {
    this.dialogRef.close({
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
  