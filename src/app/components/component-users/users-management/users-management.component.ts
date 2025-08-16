import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { FuncionManagementDialogComponent } from '../funcion-management-dialog/funcion-management-dialog.component';
import { EditUserDialogComponent } from '../add-user-dialog/edit-user-dialog/edit-user-dialog.component';
import {
  UserService,
  Usuario,
  CrearUsuario,
} from 'src/app/services/users.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppUsersManagementComponent implements OnInit {
  users: Usuario[] = [];
  searchTerm: string = '';
  filteredUsers: Usuario[] = [];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.users = usuarios;
        this.filteredUsers = usuarios;
      },
      error: () => {
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
      },
    });
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter((u) =>
      `${u.nombre} ${u.apellido_p} ${u.apellido_m}`.toLowerCase().includes(term)
    );
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '35vw',
      maxWidth: '35vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const nuevoUsuario: CrearUsuario = {
          nombre: result.name,
          apellido_p: result.paternalLastName,
          apellido_m: result.maternalLastName,
          correo: result.email,
          contrasena: result.passwordInput,
          token_sesion: '',
          turno: result.shift,
          estado: 1,
          id_rol: result.roleId,
        };

        this.userService.addUsuario(nuevoUsuario).subscribe({
          next: (usuarioCreado) => {
            this.users.push(usuarioCreado);
            this.cargarUsuarios();
            this.snackBar.open('Usuario guardado con éxito', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              panelClass: ['custom-snackbar'],
            });
          },
          error: (err) => {
            if (err.error && err.error.errors) {
              err.error.errors.forEach((e: any) => {
                console.error(`Campo: ${e.path} → Mensaje: ${e.msg}`);
              });

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
      }
    });
  }

  openRoleDialog(): void {
    const dialogRef = this.dialog.open(FuncionManagementDialogComponent, {
      width: '500px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.snackBar.open('Rol guardado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          });
        }
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
  }

  openEditUserDialog(user: any) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '600px',
      data: user,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.userService.updateUsuario(user.id, result).subscribe({
            next: (res) => {
              this.snackBar.open('Usuario actualizado con éxito', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                panelClass: ['custom-snackbar'],
              });
              this.cargarUsuarios();
            },
            error: (err) => {
              if (err.error && err.error.errors) {
                err.error.errors.forEach((e: any) => {
                  console.error(`Campo: ${e.path} → Mensaje: ${e.msg}`);
                });
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
        }
      },
      error: (err) => {
        console.error('Error en el dialog:', err);
        this.snackBar.open('Error al abrir el diálogo', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
      },
    });
  }

  eliminarUsuario(userId: number) {
    this.userService.deleteUsuario(userId).subscribe({
      next: () => {
        // Elimina el user de la lista local
        this.users = this.users.filter((u) => u.id !== userId);

        this.snackBar.open('Usuario eliminado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
      },
      error: (err) => {
        this.snackBar.open(
          err.error?.error || 'Error al eliminar user',
          'Cerrar',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['custom-snackbar'],
          }
        );
      },
    });
  }
}
