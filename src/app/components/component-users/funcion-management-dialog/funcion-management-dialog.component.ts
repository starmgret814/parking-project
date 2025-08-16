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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import {
  UserService,
  Funcion,
  ActualizarFuncion,
} from 'src/app/services/users.service';

@Component({
  selector: 'app-funcion-management-dialog',
  standalone: true,
  templateUrl: './funcion-management-dialog.component.html',
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
    MatSnackBarModule,
  ],
})
export class FuncionManagementDialogComponent {
  showInfoBanner = true;
  roleName: string = '';
  availableSections: string[] = [];
  selectedSections: string[] = [];
  funcionesMap: Map<string, Funcion> = new Map(); // para relacionar nombre → función

  constructor(
    public dialogRef: MatDialogRef<FuncionManagementDialogComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getFuncionesUsuario().subscribe((funciones: Funcion[]) => {
      this.funcionesMap.clear();
      funciones.forEach((f) => this.funcionesMap.set(f.nombre, f));

      this.availableSections = funciones.map((f) => f.nombre);
      this.selectedSections = funciones
        .filter((f) => f.activo)
        .map((f) => f.nombre);
    });
  }

  toggleSection(section: string, isChecked: boolean): void {
    if (isChecked) {
      if (!this.selectedSections.includes(section))
        this.selectedSections.push(section);
    } else {
      this.selectedSections = this.selectedSections.filter(
        (s) => s !== section
      );
    }
  }

  saveRole(): void {
    const updates$ = this.availableSections
      .map((nombre) => {
        const func = this.funcionesMap.get(nombre);
        if (!func) return null;

        const updateData: ActualizarFuncion = {
          nombre: func.nombre,
          activo: this.selectedSections.includes(nombre), // true si está seleccionado
          estado: true,
          id_rol: 2,
        };

        return this.userService.updateFuncion(func.id, updateData);
      })
      .filter((obs) => obs !== null); // eliminamos los nulos

    forkJoin(updates$).subscribe({
      next: () => {
        this.snackBar.open('Permisos guardados con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
        this.dialogRef.close();
      },
      error: (err) => {
        if (err.error && err.error.errors) {
          err.error.errors.forEach((e: any) => {});

          const mensaje = err.error.errors[0].msg;
          this.snackBar.open(mensaje, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        } else {
          console.error('Error desconocido:', err);
          this.snackBar.open('Ocurrió un error inesperado', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        }
      },
    });

    this.availableSections.forEach((nombre) => {
      if (!this.selectedSections.includes(nombre)) {
        const func = this.funcionesMap.get(nombre);
        if (func) {
          const updateData: ActualizarFuncion = {
            nombre: func.nombre,
            activo: false,
            estado: true,
            id_rol: 2,
          };
          this.userService.updateFuncion(func.id, updateData).subscribe();
        }
      }
    });

    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
